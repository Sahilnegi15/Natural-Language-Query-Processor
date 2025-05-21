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
%token CREATE TABLE COLUMNS COLUMN WITH ADD TO ALTER
%token INT_TYPE VARCHAR_TYPE
%token <str> IDENTIFIER STRING
%token <num> NUMBER

%type <str> value comparator condition_expr column_def column_defs

%%

query:
    SHOW ALL FROM IDENTIFIER WHERE condition_expr {
        sprintf(output_sql, "SELECT * FROM %s WHERE %s;", $4, $6);
    }
    |
    SHOW ALL FROM IDENTIFIER {
        sprintf(output_sql, "SELECT * FROM %s;", $4);
    }
    |
    CREATE TABLE IDENTIFIER WITH COLUMNS column_defs {
        sprintf(output_sql, "CREATE TABLE %s (%s);", $3, $6);
    }
    |
    ALTER TABLE IDENTIFIER ADD COLUMN column_def TO IDENTIFIER {
        sprintf(output_sql, "ALTER TABLE %s ADD COLUMN %s;", $3, $6);
    }
;

condition_expr:
    IDENTIFIER comparator value {
        sprintf(condition, "%s %s %s", $1, $2, $3);
        $$ = strdup(condition);
    }
    |
    NOT condition_expr {
        sprintf(condition, "NOT (%s)", $2);
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
    GREATER THAN      { $$ = strdup(">"); }
    |
    LESS THAN         { $$ = strdup("<"); }
    |
    EQUAL             { $$ = strdup("="); }
    |
    NOT EQUAL         { $$ = strdup("!="); }
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

column_defs:
    column_defs column_def {
        char temp[512];
        sprintf(temp, "%s, %s", $1, $2);
        $$ = strdup(temp);
    }
    |
    column_def {
        $$ = strdup($1);
    }
;

column_def:
    IDENTIFIER INT_TYPE {
        char temp[128];
        sprintf(temp, "%s INT", $1);
        $$ = strdup(temp);
    }
    |
    IDENTIFIER VARCHAR_TYPE {
        char temp[128];
        sprintf(temp, "%s VARCHAR(255)", $1);
        $$ = strdup(temp);
    }
;

%%

void yyerror(const char *s) {
    fprintf(stderr, "Parse error: %s\n", s);
}
