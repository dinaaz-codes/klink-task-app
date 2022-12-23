<?php

namespace Tests\Feature;

use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;
use Illuminate\Support\Str;

class TransactionTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_upload_correct_csv()
    {
        Storage::fake('uploads');

        $header = 'Txhash,DateTime,Address,Amount';
        $row1 = '0xe4e94fe9ba1bc19e9f529373bea95817e737f9737c6d472d03f17e10a4146c2b,11/8/2022 17:12:23,0x21a31ee1afc51d94c2efccaa2092ad1028285549,11987866.86';

        $content = implode("\n", [$header, $row1]);


        $inputs = [
            'file' =>
            UploadedFile::
                fake()->
                createWithContent(
                    'test.csv',
                    $content
                )
        ];


        $response = $this->json('POST','/api/transaction', $inputs);

        $response->assertStatus(201);
    }


    public function test_upload_non_csv()
    {
        Storage::fake('uploads');

        $inputs = [
            'file' =>
            UploadedFile::
                fake()->
                create(
                    'test',
                    2,
                    'text/plain'
                )
        ];

        $response = $this->json('POST', '/api/transaction', $inputs);

        $response->assertStatus(422);
    }

    public function test_upload_csv_with_wrong_headers()
    {
        Storage::fake('uploads');

        $header = 'Txhash,DateTime,Addresses,Amounts';
        $row1 = '0xe4e94fe9ba1bc19e9f529373bea95817e737f9737c6d472d03f17e10a4146c2b,11/8/2022 17:12:23,0x21a31ee1afc51d94c2efccaa2092ad1028285549,11987866.86';

        $content = implode("\n", [$header, $row1]);


        $inputs = [
            'file' =>
            UploadedFile::
                fake()->
                createWithContent(
                    'test.csv',
                    $content
                )
        ];


        $response = $this->json('POST', '/api/transaction', $inputs);

        $response->assertStatus(400);
    }


    public function test_list_transactions()
    {
        $wallet_address = "0x21a31ee1afc51d94c2efccaa2092ad1028285549";
        Transaction::create(
            [
                "id" => Str::uuid(),
                "tx_hash" => "12345",
                "address" => "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
                "amount" => "11987866.86",
                "date_time" => "11/8/2022 17:12:23",

            ],
        );
        Transaction::create(
            [
                "id" => Str::uuid(),
                "tx_hash" => "12349",
                "address" => "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
                "date_time" => "11/8/2022 17:12:23",
                "amount" => 11987866.86,
            ],
        );
        Transaction::create(
            [
                "id" => Str::uuid(),
                "tx_hash" => "12349",
                "address" => "0x21a31ee1afc51d94c2efccaa2092ad1028285540",
                "date_time" => "11/8/2022 17:12:23",
                "amount" => 11987866.86,
            ],
        );

        $response = $this->get("/api/transaction?wallet_address=$wallet_address");

        $response->assertStatus(200)->assertJson(
            fn(AssertableJson $json) =>
            $json->has('meta')
                ->has('data', 2)
                ->has('data.transactions', 2)
                ->where('data.totalAmount', 23975733.72)
        );
    }

    public function test_list_transactions_without_wallet_address()
    {
        $wallet_address = "";
        Transaction::create(
            [
                "id" => Str::uuid(),
                "tx_hash" => "12345",
                "address" => "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
                "amount" => "11987866.86",
                "date_time" => "11/8/2022 17:12:23",

            ],
        );
        Transaction::create(
            [
                "id" => Str::uuid(),
                "tx_hash" => "12349",
                "address" => "0x21a31ee1afc51d94c2efccaa2092ad1028285549",
                "date_time" => "11/8/2022 17:12:23",
                "amount" => 11987866.86,
            ],
        );
        Transaction::create(
            [
                "id" => Str::uuid(),
                "tx_hash" => "12349",
                "address" => "0x21a31ee1afc51d94c2efccaa2092ad1028285540",
                "date_time" => "11/8/2022 17:12:23",
                "amount" => 11987866.86,
            ],
        );

        $response = $this->get("/api/transaction?wallet_address=$wallet_address");

        $response->assertStatus(400);
    }
}