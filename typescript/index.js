const { resolve } = require("path");
const base = resolve(__dirname, "..", "index.js");

let rules = {
    "array-type": ["warn", { default: "array" }],
    "ban-ts-comment": ["error", { minimumDescriptionLength: 5 }],
    "ban-tslint-comment": "error",
    "consistent-indexed-object-style": ["error", "record"],
    "consistent-type-assertions": ["error", { assertionStyle: "as", objectLiteralTypeAssertions: "allow-as-parameter" }],
    "consistent-type-definitions": ["error", "interface"],
    "consistent-type-exports": ["warn", { fixMixedExportsWithInlineTypeSpecifier: false }],
    "consistent-type-imports": ["warn", { prefer: "no-type-imports" }],
    "explicit-function-return-type": ["error", { allowExpressions: true }],
    "explicit-member-accessibility": ["warn", { accessibility: "explicit" }],
    "member-delimiter-style": "error",
    "member-ordering": ["warn", {
        default: [
            "signature",

            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",

            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",

            "public-abstract-field",
            "protected-abstract-field",
            "private-abstract-field",

            "public-field",
            "protected-field",
            "private-field",

            "public-static-field",
            "protected-static-field",
            "private-static-field",

            "decorated-field",
            "instance-field",
            "abstract-field",

            "field",

            "static-field",

            "public-constructor",
            "protected-constructor",
            "private-constructor",

            "constructor",

            "public-decorated-method",
            "protected-decorated-method",
            "private-decorated-method",

            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",

            "public-abstract-method",
            "protected-abstract-method",
            "private-abstract-method",

            "public-method",
            "protected-method",
            "private-method",

            "public-static-method",
            "protected-static-method",
            "private-static-method",

            "decorated-method",
            "instance-method",
            "abstract-method",

            "method",

            "static-method"
        ]
    }],
    "method-signature-style": ["warn", "property"],
    "no-base-to-string": "error",
    "no-confusing-non-null-assertion": "warn",
    "no-dynamic-delete": "error",
    "no-explicit-any": "off",
    "no-extraneous-class": "error",
    "no-invalid-void-type": "warn",
    "no-meaningless-void-operator": "warn",
    "no-misused-promises": ["warn", { checksVoidReturn: false }],
    "no-non-null-asserted-nullish-coalescing": "warn",
    "no-non-null-asserted-optional-chain": "warn",
    "no-non-null-assertion": "off",
    "no-require-imports": "warn",
    "no-unnecessary-boolean-literal-compare": "error",
    "no-unnecessary-condition": "error",
    "no-unnecessary-type-arguments": "error",
    "no-unsafe-assignment": "off",
    "no-unsafe-call": "warn",
    "no-unsafe-member-access": "warn",
    "no-unsafe-return": "off",
    "non-nullable-type-assertion-style": "warn",
    "prefer-enum-initializers": "warn",
    "prefer-for-of": "warn",
    "prefer-function-type": "warn",
    "prefer-includes": "warn",
    "prefer-nullish-coalescing": "warn",
    "prefer-optional-chain": "warn",
    "prefer-readonly": "warn",
    "prefer-reduce-type-parameter": "warn",
    "prefer-regexp-exec": "warn",
    "prefer-return-this-type": "warn",
    "prefer-string-starts-ends-with": "warn",
    "prefer-ts-expect-error": "error",
    "restrict-template-expressions": ["warn", { allowBoolean: true, allowNumber: true }],
    "sort-type-union-intersection-members": "warn",
    "switch-exhaustiveness-check": "error",
    "type-annotation-spacing": "warn",
    "unified-signatures": "warn"
};

let extensionRules = {
    "brace-style": "infer",
    "comma-dangle": "infer",
    "comma-spacing": "infer",
    "default-param-last": "infer",
    "dot-notation": "infer",
    "func-call-spacing": "infer",
    indent: "infer",
    "keyword-spacing": "infer",
    "lines-between-class-members": "infer",
    "no-array-constructor": "infer",
    "no-dupe-class-members": "infer",
    "no-duplicate-imports": "infer",
    "no-empty-function": "infer",
    "no-extra-parens": "infer",
    "no-extra-semi": "infer",
    "no-implied-eval": "infer",
    "no-invalid-this": "infer",
    "no-loop-func": "infer",
    "no-loss-of-precision": "infer",
    "no-redeclare": "infer",
    "no-shadow": "infer",
    "no-throw-literal": "infer",
    "no-unused-expressions": "infer",
    "no-unused-vars": "infer",
    "no-use-before-define": "infer",
    "no-useless-constructor": "infer",
    "object-curly-spacing": "infer",
    "padding-line-between-statements": "infer",
    quotes: "infer",
    "require-await": "infer",
    "return-await": "warn",
    semi: "infer",
    "space-before-function-paren": "infer",
    "space-infix-ops": "infer"
};

const addPrefix = string => `@typescript-eslint/${string}`;
const delPrefix = string => string.replace("@typescript-eslint/", "");

rules = Object.fromEntries(Object.entries(rules).map(([key, val]) => [addPrefix(key), val]));
extensionRules = Object.fromEntries(Object.entries(extensionRules).map(([key, val]) => [addPrefix(key), val]));

rules = {
    ...rules,
    camelcase: "off",
    "@typescript-eslint/naming-convention": [
        "warn",
        {
            selector: "default",
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
            trailingUnderscore: "forbid"
        },
        {
            selector: "variable",
            modifiers: ["destructured"],
            format: null
        }
    ]
};

const baseRules = Object.entries(extensionRules).map(([key]) => [delPrefix(key), "off"]);

const eslintRecommended = require(resolve(require.resolve("eslint"), "..", "..", "conf", "eslint-recommended.js"));
const baseRulesOptions = { ...eslintRecommended.rules, ...require(base).rules };

const doneInferred = Object.entries(extensionRules)
    .filter(([_key, val]) => val === "infer")
    .map(([key]) => [key, baseRulesOptions[delPrefix(key)] ?? undefined]);

const inferredButUndefined = doneInferred.filter(([_, v]) => v === undefined);
if (inferredButUndefined.length !== 0) {
    throw new Error(
        `There are ${inferredButUndefined.length} total of inferredButUndefined.` +
        `List:\n${inferredButUndefined.map(([k]) => k).join("\n")}`
    );
}

extensionRules = { ...Object.fromEntries(baseRules), ...extensionRules, ...Object.fromEntries(doneInferred) };

module.exports = {
    extends: [base, "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
    rules: { ...rules, ...extensionRules }
};