<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable();
            $table->string('profile_picture')->nullable();
        });

        Schema::table('addresses', function (Blueprint $table) {
            $table->renameColumn('adress_name', 'address_name');
            $table->renameColumn('full_adress', 'full_address');
            $table->boolean('is_primary')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('addresses', function (Blueprint $table) {
            $table->renameColumn('address_name', 'adress_name');
            $table->renameColumn('full_address', 'full_adress');
            $table->dropColumn('is_primary');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone_number');
            $table->dropColumn('profile_picture');
        });
    }
};
