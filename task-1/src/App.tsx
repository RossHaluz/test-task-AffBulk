import { Typography, Alert, TextField, Box, Stack, Select, FormControl, FormLabel, MenuItem } from "@mui/material";
import "./styles.css";
import React, { useState } from "react";

type TypeFields = { row: number; col: number; label: string; type: string; options: string | string[]; }[]

export default function App() {
  const [value, setValue] = useState('');
  const [fields, setFields] = useState<TypeFields | []>([]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(!value) return null;
    setValue(value)
   const lines = value?.split('\n').filter(Boolean);
   const parsed = lines?.map((line) => {
     const [row, col, label, type, options] = line.split(";");
     return {
       row: Number(row),
       col: Number(col),
       label,
       type, 
       options: type === 'SELECT' ? options?.split(',') : options
     };
   });

   setFields(parsed);
  }
  return (
    <Box className="element-drawer" sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Create an Element Drawer
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Enter strings with the following format:
        </Typography>

        <Typography
          variant="caption"
          component="p"
          sx={{ mb: 2, fontFamily: "monospace" }}
        >
          rowNumber;columnNumber;inputLabel;inputType;inputOptions
        </Typography>

        <Typography variant="body1" gutterBottom>
          Example:
        </Typography>

        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography
            variant="caption"
            component="p"
            sx={{ fontFamily: "monospace" }}
          >
            1;1;gender;SELECT;Male,Female
          </Typography>
          <Typography
            variant="caption"
            component="p"
            sx={{ fontFamily: "monospace" }}
          >
            2;1;firstName;TEXT_INPUT;Enter your first name
          </Typography>
        </Stack>

        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          <Typography variant="caption" component="li">
            rowNumber - Row position of the element
          </Typography>
          <Typography variant="caption" component="li">
            columnNumber - Column position of the element
          </Typography>
          <Typography variant="caption" component="li">
            inputLabel - Label text of the input element
          </Typography>
          <Typography variant="caption" component="li">
            inputType - Input type (SELECT or TEXT_INPUT)
          </Typography>
          <Typography variant="caption" component="li">
            inputOptions - For SELECT: comma-separated options. For TEXT_INPUT:
            input placeholder text
          </Typography>
        </Box>
      </Alert>

      <TextField
        label="Element Drawer"
        placeholder="1;2;First Name;TEXT_INPUT;Enter your first name"
        multiline
        fullWidth
        sx={{ mt: 2 }}
        value={value}
        onChange={handleChangeInput}
      />

      <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mt: 4}}>
        {fields?.map((item, idx) => {
         if(item?.type === 'TEXT_INPUT'){
          return (
            <TextField
              key={idx}
              label={item?.label}
              placeholder={typeof item?.options === 'string' ? item?.options : ''}
              sx={{gridColumn: item?.col, gridRow: item?.row}}
            />
          );
         }

         if(item?.type === 'SELECT'){
          return (
            <FormControl
              key={idx}
              sx={{ gridColumn: item?.col, gridRow: item?.row }}
            >
              <FormLabel>{item?.label}</FormLabel>
              <Select label={item?.label}>
                {Array.isArray(item?.options) &&
                  item?.options?.map((item, idx) => {
                    return <MenuItem key={idx} value={item}>{item}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          );
         }

         return null;
        })}
      </Box>
    </Box>
  );
}
