const Yup = require('yup');

exports.createOrderFormSchema = () =>
  Yup.object({
    user: Yup.object({
      address: Yup.string()
        .required('address is required')
        .length(42, "address length error"),
      signature: Yup.string()
        .required('signature is required')
        .length(132, "signature length error"),
    }),
    amount: Yup.number().required('amount is required').integer().min(1),
    type: Yup.string().required(),
    symbol: Yup.string().required(),
  });
