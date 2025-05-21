#include <stdio.h>
#include <stdlib.h>
#include <string.h>

extern int yyparse(void);
extern void yy_scan_string(const char *);
extern char output_sql[];

int yywrap(void) {
    return 1;
}

int main() {
    char input[1024];

    if (fgets(input, sizeof(input), stdin) == NULL) {
        fprintf(stderr, "Failed to read input.\n");
        return 1;
    }

    yy_scan_string(input);

    if (yyparse() == 0) {
        printf("SQL Output: %s\n", output_sql);
    } else {
        printf("Parsing failed.\n");
    }

    return 0;
}
