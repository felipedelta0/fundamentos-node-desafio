import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: TransactionDTO): Transaction {
    const { type, value } = data;

    if (type !== 'income' && type !== 'outcome') throw Error('Invalid type');

    if (!value) throw Error('Invalid value');

    const actualBalance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > actualBalance.total)
      throw Error('Not enough balance');

    const transaction = this.transactionsRepository.create(data);

    return transaction;
  }
}

export default CreateTransactionService;
