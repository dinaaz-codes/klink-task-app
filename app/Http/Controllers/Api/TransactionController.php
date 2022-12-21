<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadTransactionRequest;
use App\Services\TransactionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    private $transactionService;

    function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     * Display a listing of the resource.
     *
     * 
     */
    public function index()
    {
        return response()->json([
            "message" => "file uploaded",
            200
        ]);
    }

    /**
     * Summary of upload
     * @param UploadTransactionRequest $request
     * @return JsonResponse    
     */
    public function upload(UploadTransactionRequest $request)
    {
        $path = $request->file('file')->getRealPath();

        $transactions = $this->transactionService->processTxnCsv($path);

        return response()->json([
            "message" => "file uploaded",
            "data" => [
                "totalRecords" => count($transactions),
                "items" => $transactions
            ],
            200
        ]);
    }

}