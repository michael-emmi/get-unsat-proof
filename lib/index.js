#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const assert = require('assert');
const debug = require('debug')('xxx');

const cadical = `${__dirname}/../tools/cadical`;
const dratTrim = `${__dirname}/../tools/drat-trim`;
const tracecheck = `${__dirname}/../tools/tracecheck`;

function encodeSatQuery(formula) {
  let symbols = new Set();

  for (let clause of formula.clauses) {
    for (let literal of clause.literals) {
      symbols.add(literal.symbol);
    }
  }

  let idToSym = [...symbols];
  idToSym.unshift('_');
  let symToId = {};

  for (let [id,sym] of idToSym.entries())
    symToId[sym] = id;

  let lines = [];
  lines.push(`p cnf ${symbols.size} ${formula.clauses.length}`);
  for (let clause of formula.clauses) {
    let line = clause.literals.map(l => `${l.positive ? '' : '-'}${symToId[l.symbol]}`).concat('0').join(' ');
    lines.push(line);
  }

  let encoding = lines.join('\n');
  return { encoding, idToSym, symToId };
}

function getResolvent(c1, c2) {
  for (let l1 of c1) {
    for (let l2 of c2) {
      if (l1 == -l2) {
        let r1 = c1.filter(l => l != l1);
        let r2 = c2.filter(l => l != l2);
        return [...new Set([...r1, ...r2])];
      }
    }
  }

  assert(false, `cannot resolve clauses ${c1} and ${c2}`);
}

function decodeResolutionProof(string, idToSym) {
  const proof = {
    clauses: []
  };
  for (let line of string.split('\n')) {
    let [id, ...ids] = line.split(' ').map(i => +i).filter(i => i !== 0);

    if (!ids.length)
      continue;

    if (isNaN(ids[0])) {
      let [_, l, r] = ids;
      let ll = proof.clauses.find(({ id }) => id == l);
      let rr = proof.clauses.find(({ id }) => id == r);
      assert(ll);
      assert(rr);
      proof.clauses.push({
        id,
        kind: 'resolvent',
        premises: [l,r],
        literals: getResolvent(ll.literals, rr.literals)
      });

    } else {
      let literals = ids;
      proof.clauses.push({
        id,
        kind: 'input',
        literals
      });
    }
  }

  // map identifiers to symbols
  for (let clause of Object.values(proof.clauses)) {
    clause.literals = clause.literals.map(id => ({
      symbol: idToSym[Math.abs(id)],
      positive: id > 0
    }));
  }

  return proof;
}

async function getUnsatProof(query) {
  const commands = [
    `temp=$(mktemp -d)`,
    `pushd $temp > /dev/null`,
    `echo "${query}" > a.cnf`,
    `(${cadical} a.cnf a.drat > /dev/null || true)`,
    `${dratTrim} a.cnf a.drat -r a.trace > /dev/null`,
    `${tracecheck} -b a.out -c a.cnf a.trace > /dev/null`,
    `cat a.out`,
    `popd > /dev/null`,
  ];
  const { stdout, stderr } = await exec(commands.join(' && '));
  return stdout.toString();
}

async function main() {
  let input = fs.readFileSync('/dev/stdin').toString();
  debug(`input: %s`, input);

  let query = JSON.parse(input);
  debug(`query: %O`, query);

  let { encoding, idToSym, symToId } = encodeSatQuery(query);
  debug(`encoding: %s`, encoding);

  let proof = await getUnsatProof(encoding);
  debug(`proof: %s`, proof);

  let decoded = decodeResolutionProof(proof, idToSym);
  debug(`decoded: %O`, decoded);

  console.log(JSON.stringify(decoded));
}

main();
