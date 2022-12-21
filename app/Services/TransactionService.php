<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Support\Str;

class TransactionService
{

    function processTxnCsv(string $path)
    {
        $data = array_map('str_getcsv', file($path));
        $csvHeader = array_slice($data, 0, 1)[0];
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

    private function buildTransaction($transactionData)
    {
        $txn = new Transaction();
        $txn->id = Str::uuid();
        $txn->tx_hash = $transactionData['Txhash'];
        $txn->amount = floatval(str_replace(',', '', $transactionData['Amount']));
        $txn->address = $transactionData['Address'];
        $txn->date_time = $transactionData['DateTime'];
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

    function getTransactionsByWalletAddress($walletAddress, $page = 0, $limit = 10)
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

    function getTxnTotalAmount($walletAddress)
    {
        return Transaction::where('address', $walletAddress)->sum('amount');
    }

    function getTotalCountByWalletAddress($walletAddress)
    {
        return Transaction::where('address', $walletAddress)->count();
    }

}