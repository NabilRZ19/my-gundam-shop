import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'patch',
            name: user.name,
            username: user.username || '',
            email: user.email,
            phone_number: user.phone_number || '',
            profile_picture: null,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="section-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    Edit Profile Information
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="profile_picture" value="Profile Picture" />
                    <input
                        type="file"
                        id="profile_picture"
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-none file:border-0
                          file:text-sm file:font-semibold
                          file:bg-[var(--blue)] file:text-white
                          hover:file:bg-[#004a99]"
                        onChange={(e) => setData('profile_picture', e.target.files[0])}
                    />
                    <InputError className="mt-2" message={errors.profile_picture} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" />
                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        autoComplete="tel"
                    />
                    <InputError className="mt-2" message={errors.phone_number} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="auth-link ml-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 mt-6">
                    <button className="btn-acquire" disabled={processing} style={{ minWidth: '100px' }}>
                        Save
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm" style={{ color: 'var(--blue)' }}>Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
