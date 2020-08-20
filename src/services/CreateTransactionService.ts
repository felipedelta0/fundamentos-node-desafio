import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: TransactionDTO): Transaction {
    const { type } = data

    if (type !== 'income' && type !== 'outcome')
      throw Error('Invalid type')

    const transaction = this.transactionsRepository.create(data)

    return transaction
  }
}

export default CreateTransactionService;
