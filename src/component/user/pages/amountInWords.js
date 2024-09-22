import React from 'react';

function AmountInWords({ amount }) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertToWords = (num) => {
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];

    const unit = num % 10;
    const ten = Math.floor(num / 10);

    // Only include the unit part if it's not zero
    const unitText = unit > 0 ? ` ${ones[unit]}` : '';

    return `${tens[ten]} ${unitText}`.trim();
  };

  const amountInWords = (num) => {
    if (isNaN(num) || num < 0 || num > 99999999) {
      return 'Invalid amount';
    }

    if (num === 0) return 'Zero';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return `${convertToWords(Math.floor(num / 10) * 10)}${convertToWords(num % 10)}`.trim();
    if (num < 1000) return `${ones[Math.floor(num / 100)]} Hundred ${amountInWords(num % 100)}`.trim();
    if (num < 100000) return `${amountInWords(Math.floor(num / 1000))} Thousand ${amountInWords(num % 1000)}`.trim();
    if (num < 10000000) return `${amountInWords(Math.floor(num / 100000))} Lakh ${amountInWords(num % 100000)}`.trim();
    return 'Number too large';
  };

  return (
    <div>
      {`${amountInWords(Math.floor(amount))} Rupees Only`}
    </div>
  );
}

export default AmountInWords;
