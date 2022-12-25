<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Support\Str;
use Exception;

class TransactionService
{
    /**
     * Processes transaction csv file from the given path and 
     * store the record in the db 
     * @param string $path
     * @return array
     */
    function processTxnCsv(string $path)
    {
        $data = array_map('str_getcsv', file($path));
        $csvHeader = array_slice($data, 0, 1)[0];
        $csvHeader = $this->validateTransactionCsvHeader($csvHeader);

        $csvData = array_slice($data, 1);
        $assoc = array();

        foreach ($csvData as $row) {
            array_push($assoc, array_combine($csvHeader, array_slice($row, 0, count($csvData[0]))));
        }

        $transactions = $this->chunkTransactions($assoc);

        foreach (array_chunk($transactions, 10) as $t) {
            Transaction::insert($t);
        }

        return $transactions;
    }

    /**
     * builds Transaction object
     * @param mixed $transactionData
     * @return array
     */
    private function buildTransaction($transactionData)
    {
        $txn = new Transaction();
        $txn->id = Str::uuid();
        $txn->tx_hash = $transactionData['txhash'];
        $txn->amount = floatval(str_replace(',', '', $transactionData['amount']));
        $txn->address = $transactionData['address'];
        $txn->date_time = $transactionData['datetime'];
        return $txn->toArray();
    }

    /**
     * Inserts array of csv headered transactions to Transaction db table 
     * @param mixed $transactionCsvArray
     * @return array
     */
    private function chunkTransactions($transactionCsvArray)
    {
        $totalRecords = count($transactionCsvArray);
        $transactions = array();
        for ($index = 0; $index < $totalRecords; $index++) {
            $transaction = $this->buildTransaction(
                $transactionCsvArray[$index]

            );
            array_push($transactions, $transaction);
        }

        return $transactions;
    }

    /**
     * Gets sum of total amount and paginated transactions by wallet address
     * @param string $walletAddress
     * @param int $page
     * @param int $limit
     * @return array<array>
     */
    function getTransactionsByWalletAddress(string $walletAddress, int $page, int $limit)
    {
        $transactions = Transaction::where('address', $walletAddress)->skip($page * $limit)->limit($limit)->orderBy('date_time')->get();
        $totalRecords = $this->getTotalCountByWalletAddress($walletAddress);
        $totalAmount = $this->getTxnTotalAmount($walletAddress);

        return [
            "data" => [
                "transactions" => $transactions,
                "totalAmount" => $totalAmount
            ],
            "meta" => [
                "pageNo" => $page,
                "limit" => (integer) $limit,
                "totalPages" => ceil($totalRecords / $limit),
                "hasMore" => $totalRecords > $page * $limit
            ]
        ];
    }

    /**
     * Gets sum of total ammount of transaction by wallet address
     * @param string $walletAddress
     * @return mixed
     */
    function getTxnTotalAmount(string $walletAddress)
    {
        return Transaction::where('address', $walletAddress)->sum('amount');
    }

    /**
     * Get total count of transactions records by wallet address
     * @param string $walletAddress
     * @return mixed
     */
    function getTotalCountByWalletAddress(string $walletAddress)
    {
        return Transaction::where('address', $walletAddress)->count();
    }

    function validateTransactionCsvHeader($csvHeader){
        $desiredCsvHeader = ['txhash','amount','address','datetime'];

        $csvHeader = array_map('strtolower', $csvHeader);

        $result = array_intersect($desiredCsvHeader, $csvHeader);

        if (count($desiredCsvHeader) !== count($result))
            throw new Exception('Invalid Csv Header',400);

        return $csvHeader;
    }

}