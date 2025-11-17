# Element Drawer - React Coding Task

## Task Overview
Create a dynamic form element drawer that takes a string input and renders form elements based on the provided specifications.

## Requirements

### Input Format
The application should accept input strings in the following format:
```
rowNumber;columnNumber;inputLabel;inputType;inputOptions
```

Each component of the input string represents:
- `rowNumber`: (number) - Vertical position in the grid
- `columnNumber`: (number) - Horizontal position in the grid
- `inputLabel`: (string) - Label text for the form element
- `inputType`: (string) - Type of input element to render
  - Valid values: "SELECT" or "TEXT_INPUT"
- `inputOptions`: (string)
  - For SELECT: Comma-separated list of options
  - For TEXT_INPUT: Placeholder text