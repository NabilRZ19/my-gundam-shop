import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AppLayout>
            <Head title="Log in" />

            <section className="auth-section halftone-bg">
                <div className="auth-box">
                    <div className="section-eyebrow" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <div className="eyebrow-line" style={{ margin: '0 auto 0.5rem auto' }} />
                        <span className="eyebrow-text">System Access</span>
                    </div>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Pilot Authentication</h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                    <div className="mt-6 flex items-center justify-end">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="auth-link"
                            >
                                Forgot password?
                            </Link>
                        )}
                        
                        <Link
                            href={route('register')}
                            className="auth-link ms-4"
                        >
                            Register
                        </Link>

                        <button className="btn-acquire ms-4" disabled={processing} style={{ minWidth: '120px' }}>
                            Log In
                        </button>
                    </div>
                </form>
                </div>
            </section>
        </AppLayout>
    );
}
