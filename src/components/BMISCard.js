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

export default function BasicTable({ onClick: handleClick }) {
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
    <Container component="main" maxWidth="lg">
      <ContentWrapper>
        <Typography component="h6" variant="subtitle1" sx={{ mb: 1 }}>
          هر کدام از صفتهای زیر چقدر در مورد خلق شما صدق می‌کند؟ لطفاً علامت
          بزنید{' '}
        </Typography>
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
                  <TableCell align="center" padding="none">
                    <Radio
                      checked={selectedValue[row.id] === 4}
                      onChange={(e) => handleChange(e, row.id)}
                      value="4"
                      name="radio-buttons"
                    />
                  </TableCell>
                  <TableCell align="center" padding="none">
                    <Radio
                      checked={selectedValue[row.id] === 3}
                      onChange={(e) => handleChange(e, row.id)}
                      value="3"
                      name="radio-buttons"
                    />
                  </TableCell>
                  <TableCell align="center" padding="none">
                    <Radio
                      checked={selectedValue[row.id] === 2}
                      onChange={(e) => handleChange(e, row.id)}
                      value="2"
                      name="radio-buttons"
                    />
                  </TableCell>
                  <TableCell align="center" padding="none">
                    <Radio
                      checked={selectedValue[row.id] === 1}
                      onChange={(e) => handleChange(e, row.id)}
                      value="1"
                      name="radio-buttons"
                    />
                  </TableCell>
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
          ورود به آزمون
        </Button>
      </ContentWrapper>
    </Container>
  );
}
