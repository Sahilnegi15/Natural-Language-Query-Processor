#include <stdio.h>
#include <stdlib.h>
#include <string.h>

extern int yyparse(void);
extern void yy_scan_string(const char *);  // from Flex
extern char output_sql[];                  // global buffer from Bison/Flex

int main() {
    char input[1024];

    // Read a line of input from stdin
    if (fgets(input, sizeof(input), stdin) == NULL) {
        fprintf(stderr, "Failed to read input.\n");
        return 1;
    }

    // Send input to the lexer
    yy_scan_string(input);

    // Run the parser
    if (yyparse() == 0) {
        printf("%s\n", output_sql);  // Output the SQL (stdout → Node will capture this)
    } else {
        printf("Failed to parse query.\n");  // Still stdout to show in React
    }

    return 0;
}
