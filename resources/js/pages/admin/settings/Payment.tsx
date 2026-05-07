import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { CreditCard, Save, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
    settings: {
        stripe_publishable_key: string;
        stripe_secret_key: string;
        stripe_webhook_secret: string;
        stripe_status: string;
    };
}

export default function PaymentSettings() {
    const { props } = usePage<Props>();
    const { settings } = props;

    const [formData, setFormData] = useState({
        stripe_publishable_key: settings.stripe_publishable_key || '',
        stripe_secret_key: settings.stripe_secret_key || '',
        stripe_webhook_secret: settings.stripe_webhook_secret || '',
        stripe_status: settings.stripe_status || 'inactive',
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        router.post('/admin/settings/payment', formData, {
            onFinish: () => setSaving(false),
        });
    };

    const isStripeActive = formData.stripe_status === 'active';

    return (
        <>
            <Head title="Payment Settings" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Payment Settings</h1>
                        <p className="text-muted-foreground">Manage your payment gateway settings</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Stripe Configuration
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Shield className={`w-5 h-5 ${isStripeActive ? 'text-green-600' : 'text-gray-400'}`} />
                                    <div>
                                        <p className="font-medium">Stripe Status</p>
                                        <p className="text-sm text-muted-foreground">
                                            {isStripeActive ? 'Active - Payments enabled' : 'Inactive - Payments disabled'}
                                        </p>
                                    </div>
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        id="stripe_status"
                                        checked={formData.stripe_status === 'active'}
                                        onCheckedChange={(checked) => setFormData({ ...formData, stripe_status: checked ? 'active' : 'inactive' })}
                                    />
                                    <span className="text-sm">Enable</span>
                                </label>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="stripe_publishable_key">Publishable Key</Label>
                                    <Input
                                        id="stripe_publishable_key"
                                        type="text"
                                        placeholder="pk_test_..."
                                        value={formData.stripe_publishable_key}
                                        onChange={(e) => setFormData({ ...formData, stripe_publishable_key: e.target.value })}
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Found in Stripe Dashboard → Developers → API Keys
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="stripe_secret_key">Secret Key</Label>
                                    <Input
                                        id="stripe_secret_key"
                                        type="password"
                                        placeholder="sk_test_..."
                                        value={formData.stripe_secret_key}
                                        onChange={(e) => setFormData({ ...formData, stripe_secret_key: e.target.value })}
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Keep this key secret! Found in Stripe Dashboard → Developers → API Keys
                                    </p>
                                </div>

                                <div>
                                    <Label htmlFor="stripe_webhook_secret">Webhook Secret (Optional)</Label>
                                    <Input
                                        id="stripe_webhook_secret"
                                        type="text"
                                        placeholder="whsec_..."
                                        value={formData.stripe_webhook_secret}
                                        onChange={(e) => setFormData({ ...formData, stripe_webhook_secret: e.target.value })}
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Found in Stripe Dashboard → Developers → Webhooks
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-blue-800">Test Mode</p>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Use test API keys for development. Get them from{' '}
                                            <a href="https://dashboard.stripe.com/test/apikeys" target="_blank" className="underline">
                                                Stripe Dashboard
                                            </a>
                                        </p>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Test card numbers: 4242 4242 4242 4242
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={saving}>
                                    <Save className="w-4 h-4 mr-2" />
                                    {saving ? 'Saving...' : 'Save Settings'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}

PaymentSettings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Payment Settings', href: '/admin/settings/payment' },
    ],
};