all:
	bison -d nlqp.y
	flex token.l
	gcc -o nlqp main.c nlqp.tab.c lex.yy.c -lfl

