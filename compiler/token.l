%{
#include "nlqp.tab.h"
#include <string.h>
%}

%%

"show"              { return SHOW; }
"all"               { return ALL; }
"from"              { return FROM; }
"where"             { return WHERE; }
"is"                { return IS; }
"greater"|"more"    { return GREATER; }
"less"|"smaller"    { return LESS; }
"than"              { return THAN; }
"equal"             { return EQUAL; }
"not"               { return NOT; }
"and"               { return AND; }
"or"                { return OR; }

">="                { return GE; }
"<="                { return LE; }
"!="|"not equal"    { return NE; }
">"                 { return GT; }
"<"                 { return LT; }
"="                 { return EQ; }

\"[^\"]*\"          {
                      yylval.str = strdup(yytext + 1);  // skip starting quote
                      yylval.str[strlen(yylval.str) - 1] = '\0'; // remove ending quote
                      return STRING;
                  }

[0-9]+              { yylval.num = atoi(yytext); return NUMBER; }
[a-zA-Z_][a-zA-Z0-9_]*  { yylval.str = strdup(yytext); return IDENTIFIER; }

[ \t\n\r]+          { /* ignore whitespace */ }
.                   { return yytext[0]; }
%%
