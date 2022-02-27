/* eslint-disable react/prop-types */
import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ContentWrapper from '../assets/ContentWrapper';

function createData(name, id) {
  return { name, id };
}

const rows = [
  createData('سرزنده', 'lively'),
  createData('خوشحال', 'happy'),
  createData('غمگین', 'sad'),
  createData('خسته', 'tired'),
  createData('حمایتگر', 'supportive'),
  createData('راضی و خشنود', 'satisfied'),
  createData('گرفته و پکر', 'pensive'),
  createData('متلاطم و بی قرار', 'restless'),
  createData('خواب‌آلود', 'sleepy'),
  createData('بداخلاق', 'bad_tempered'),
  createData('باروحیه', 'spirit'),
  createData('عصبی', 'nervous'),
  createData('آرام ', 'quiet'),
  createData('با محبت', 'loving'),
  createData('کسل و ملول', 'bored'),
  createData('پرانرژی', 'energetic'),
];

export default function BasicTable({ buttonTitle, onClick: handleClick }) {
  const [selectedValue, setSelectedValue] = React.useState({
    lively: undefined,
    happy: undefined,
    sad: undefined,
    tired: undefined,
    supportive: undefined,
    satisfied: undefined,
    pensive: undefined,
    restless: undefined,
    sleepy: undefined,
    bad_tempered: undefined,
    spirit: undefined,
    nervous: undefined,
    quiet: undefined,
    loving: undefined,
    bored: undefined,
    energetic: undefined,
  });

  const handleChange = (event, id) => {
    setSelectedValue({ ...selectedValue, [id]: +event.target.value });
  };

  return (
    <Container component="main" maxWidth="md">
      <ContentWrapper>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
          }}
        >
          <Typography component="h6" variant="h5" sx={{ mb: 1 }}>
            در این مرحله به مقیاس کوتاه درون‌نگری خلق پاسخ می‌دهید.
          </Typography>
          <Typography component="h6" variant="subtitle1" sx={{ mb: 4 }}>
            هر کدام از صفت های زیر چقدر در مورد خلق شما صدق می‌کند؟ لطفاً علامت
            بزنید{' '}
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">کاملاً این احساس را دارم</TableCell>
                <TableCell align="right">کمی این احساس را دارم </TableCell>
                <TableCell align="right">چنین احساسی ندارم </TableCell>
                <TableCell align="right">اصلاً چنین احساسی ندارم</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.name}</TableCell>
                  {[3, 2, 1, 0].map((i) => (
                    <TableCell key={i} align="center" padding="none">
                      <Radio
                        checked={selectedValue[row.id] === i}
                        onChange={(e) => handleChange(e, row.id)}
                        value={i}
                        name="radio-buttons"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 5 }}
          onClick={() => handleClick(selectedValue)}
        >
          {buttonTitle}
        </Button>
      </ContentWrapper>
    </Container>
  );
}
