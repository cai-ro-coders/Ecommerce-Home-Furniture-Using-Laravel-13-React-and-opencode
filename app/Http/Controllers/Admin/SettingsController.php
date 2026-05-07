<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = DB::table('settings')->where('group', 'payment')->get()->keyBy('key');
        
        return Inertia::render('admin/settings/Payment', [
            'settings' => [
                'stripe_publishable_key' => $settings->get('stripe_publishable_key')?->value ?? '',
                'stripe_secret_key' => $settings->get('stripe_secret_key')?->value ?? '',
                'stripe_webhook_secret' => $settings->get('stripe_webhook_secret')?->value ?? '',
                'stripe_status' => $settings->get('stripe_status')?->value ?? 'inactive',
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'stripe_publishable_key' => 'nullable|string',
            'stripe_secret_key' => 'nullable|string',
            'stripe_webhook_secret' => 'nullable|string',
            'stripe_status' => 'nullable|in:active,inactive',
        ]);

        $settings = [
            'stripe_publishable_key' => $request->stripe_publishable_key,
            'stripe_secret_key' => $request->stripe_secret_key,
            'stripe_webhook_secret' => $request->stripe_webhook_secret,
            'stripe_status' => $request->stripe_status,
        ];

        foreach ($settings as $key => $value) {
            DB::table('settings')->updateOrInsert(
                ['key' => $key, 'group' => 'payment'],
                ['value' => $value, 'updated_at' => now()]
            );
        }

        return back()->with('success', 'Payment settings updated successfully.');
    }
}