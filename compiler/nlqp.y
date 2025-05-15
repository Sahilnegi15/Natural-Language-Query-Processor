%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void yyerror(const char *s);
int yylex(void);

char output_sql[1024];
char condition[512];
%}

%union {
    char* str;
    int num;
}

%token SHOW ALL FROM WHERE IS GREATER LESS THAN EQUAL NOT AND OR
%token GE LE NE GT LT EQ
%token <str> IDENTIFIER STRING
%token <num> NUMBER

%type <str> value comparator condition_expr

%%

query:
    SHOW ALL FROM IDENTIFIER WHERE condition_expr {
        sprintf(output_sql, "SELECT * FROM %s WHERE %s;", $4, $6);
    }
    |
    SHOW ALL FROM IDENTIFIER {
        sprintf(output_sql, "SELECT * FROM %s;", $4);
    }
;

condition_expr:
    IDENTIFIER comparator value {
        sprintf(condition, "%s %s %s", $1, $2, $3);
        $$ = strdup(condition);
    }
    |
    condition_expr AND condition_expr {
        sprintf(condition, "(%s AND %s)", $1, $3);
        $$ = strdup(condition);
    }
    |
    condition_expr OR condition_expr {
        sprintf(condition, "(%s OR %s)", $1, $3);
        $$ = strdup(condition);
    }
;

comparator:
    GT        { $$ = strdup(">"); }
    |
    LT        { $$ = strdup("<"); }
    |
    EQ        { $$ = strdup("="); }
    |
    NE        { $$ = strdup("!="); }
    |
    GE        { $$ = strdup(">="); }
    |
    LE        { $$ = strdup("<="); }
    |
    GREATER THAN    { $$ = strdup(">"); }
    |
    LESS THAN       { $$ = strdup("<"); }
    |
    EQUAL           { $$ = strdup("="); }
    |
    NOT EQUAL       { $$ = strdup("!="); }
;

value:
    NUMBER {
        char buffer[32];
        sprintf(buffer, "%d", $1);
        $$ = strdup(buffer);
    }
    |
    STRING {
        char quoted[256];
        sprintf(quoted, "'%s'", $1);
        $$ = strdup(quoted);
    }
;

%%

void yyerror(const char *s) {
    fprintf(stderr, "Parse error: %s\n", s);
}
