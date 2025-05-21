%{
#include "nlqp.tab.h"
#include <string.h>
%}

%%
"show"              return SHOW;
"all"               return ALL;
"from"              return FROM;
"where"             return WHERE;
"create"            return CREATE;
"table"             return TABLE;
"with"              return WITH;
"columns"           return COLUMNS;
"column"            return COLUMN;
"add"               return ADD;
"to"                return TO;
"alter"             return ALTER;

"int"               return INT_TYPE;
"varchar"           return VARCHAR_TYPE;
"greater"           return GREATER;
"less"              return LESS;
"than"              return THAN;
"equal"             return EQUAL;
"not"               return NOT;
"and"               return AND;
"or"                return OR;

[0-9]+              { yylval.num = atoi(yytext); return NUMBER; }
\'[^\']*\'          { yytext[yyleng - 1] = '\0'; yylval.str = strdup(yytext + 1); return STRING; }

[a-zA-Z_][a-zA-Z0-9_]* { yylval.str = strdup(yytext); return IDENTIFIER; }

[ \t\n\r]+          ;  // skip whitespace
.                   { printf("Unknown character: %s\n", yytext); }
%%
