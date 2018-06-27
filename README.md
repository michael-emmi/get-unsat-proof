# Get Unsat Proof

A simple tool to retrieve resolution proofs.

## Usage

```sh
# fetch the dependencies
git submodule init
git submodule update
npm i

# build the dependencies
make

# run the script
./lib/index.js < ./examples/test-cnf.json
```

## Example Output

```sh
$ cat ./examples/test-cnf.json && ./lib/index.js < ./examples/test-cnf.json
{
  "clauses": [
    { "literals": [
      { "symbol": "x5", "positive": true },
      { "symbol": "x4", "positive": false }]},
    { "literals": [
      { "symbol": "x1", "positive": true },
      { "symbol": "x5", "positive": false }]},
    { "literals": [
      { "symbol": "x6", "positive": false },
      { "symbol": "x1", "positive": false }]},
    { "literals": [
      { "symbol": "x5", "positive": false },
      { "symbol": "x2", "positive": false }]},
    { "literals": [
      { "symbol": "x5", "positive": true },
      { "symbol": "x2", "positive": true }]},
    { "literals": [
      { "symbol": "x5", "positive": false },
      { "symbol": "x1", "positive": false },
      { "symbol": "x6", "positive": true }]},
    { "literals": [
      { "symbol": "x6", "positive": false },
      { "symbol": "x4", "positive": false }]},
    { "literals": [
      { "symbol": "x6", "positive": true },
      { "symbol": "x4", "positive": true }]},
    { "literals": [
      { "symbol": "x6", "positive": false },
      { "symbol": "x3", "positive": false },
      { "symbol": "x5", "positive": true }]},
    { "literals": [
      { "symbol": "x2", "positive": false },
      { "symbol": "x6", "positive": false },
      { "symbol": "x1", "positive": true }]},
    { "literals": [
      { "symbol": "x1", "positive": false },
      { "symbol": "x4", "positive": false },
      { "symbol": "x2", "positive": true }]},
    { "literals": [
      { "symbol": "x4", "positive": false },
      { "symbol": "x5", "positive": false },
      { "symbol": "x3", "positive": true }]},
    { "literals": [
      { "symbol": "x3", "positive": false },
      { "symbol": "x1", "positive": false }]},
    { "literals": [
      { "symbol": "x3", "positive": true },
      { "symbol": "x1", "positive": true }]},
    { "literals": [
      { "symbol": "x3", "positive": false },
      { "symbol": "x2", "positive": false },
      { "symbol": "x4", "positive": true }]}
  ]
}
{
  "clauses": [
    {
      "id": 10,
      "kind": "input",
      "literals": [
        {
          "symbol": "x1",
          "positive": true
        },
        {
          "symbol": "x2",
          "positive": false
        },
        {
          "symbol": "x6",
          "positive": false
        }
      ]
    },
    {
      "id": 3,
      "kind": "input",
      "literals": [
        {
          "symbol": "x6",
          "positive": false
        },
        {
          "symbol": "x1",
          "positive": false
        }
      ]
    },
    {
      "id": 8,
      "kind": "input",
      "literals": [
        {
          "symbol": "x4",
          "positive": true
        },
        {
          "symbol": "x6",
          "positive": true
        }
      ]
    },
    {
      "id": 5,
      "kind": "input",
      "literals": [
        {
          "symbol": "x2",
          "positive": true
        },
        {
          "symbol": "x5",
          "positive": true
        }
      ]
    },
    {
      "id": 1,
      "kind": "input",
      "literals": [
        {
          "symbol": "x4",
          "positive": false
        },
        {
          "symbol": "x5",
          "positive": true
        }
      ]
    },
    {
      "id": 6,
      "kind": "input",
      "literals": [
        {
          "symbol": "x1",
          "positive": false
        },
        {
          "symbol": "x6",
          "positive": true
        },
        {
          "symbol": "x5",
          "positive": false
        }
      ]
    },
    {
      "id": 2,
      "kind": "input",
      "literals": [
        {
          "symbol": "x1",
          "positive": true
        },
        {
          "symbol": "x5",
          "positive": false
        }
      ]
    },
    {
      "id": 16,
      "kind": "resolvent",
      "premises": [
        6,
        3
      ],
      "literals": [
        {
          "symbol": "x1",
          "positive": false
        },
        {
          "symbol": "x5",
          "positive": false
        }
      ]
    },
    {
      "id": 17,
      "kind": "resolvent",
      "premises": [
        16,
        2
      ],
      "literals": [
        {
          "symbol": "x5",
          "positive": false
        }
      ]
    },
    {
      "id": 18,
      "kind": "resolvent",
      "premises": [
        5,
        10
      ],
      "literals": [
        {
          "symbol": "x5",
          "positive": true
        },
        {
          "symbol": "x1",
          "positive": true
        },
        {
          "symbol": "x6",
          "positive": false
        }
      ]
    },
    {
      "id": 19,
      "kind": "resolvent",
      "premises": [
        18,
        3
      ],
      "literals": [
        {
          "symbol": "x5",
          "positive": true
        },
        {
          "symbol": "x6",
          "positive": false
        }
      ]
    },
    {
      "id": 20,
      "kind": "resolvent",
      "premises": [
        19,
        8
      ],
      "literals": [
        {
          "symbol": "x5",
          "positive": true
        },
        {
          "symbol": "x4",
          "positive": true
        }
      ]
    },
    {
      "id": 21,
      "kind": "resolvent",
      "premises": [
        20,
        1
      ],
      "literals": [
        {
          "symbol": "x5",
          "positive": true
        }
      ]
    },
    {
      "id": 22,
      "kind": "resolvent",
      "premises": [
        21,
        17
      ],
      "literals": []
    }
  ]
}

```
