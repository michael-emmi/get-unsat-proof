
all: tools/cadical tools/tracecheck tools/drat-trim

tools/tracecheck: booleforce.tar.gz
	tar zxvf booleforce.tar.gz
	cd booleforce* && CFLAGS=-O2 ./configure && make
	mkdir -p tools
	cp booleforce*/tracecheck tools

booleforce.tar.gz:
	curl -o booleforce.tar.gz http://fmv.jku.at/booleforce/booleforce-1.2.tar.gz

tools/drat-trim:
	cd drat-trim && make
	mkdir -p tools
	cp drat-trim/drat-trim tools

tools/cadical:
	cd cadical && ./configure && make
	mkdir -p tools
	cp cadical/build/cadical tools
