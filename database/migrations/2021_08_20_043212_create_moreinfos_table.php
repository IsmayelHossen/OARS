<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoreinfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moreinfos', function (Blueprint $table) {
            $table->id();
            $table->string('heading');
            $table->string('degree')->nullable();
            $table->string('institution')->nullable();
            $table->string('passing')->nullable();
            $table->string('result')->nullable();
            $table->string('details')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('moreinfos');
    }
}
