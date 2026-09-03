import { useEffect, useState } from "react";
import type { AccountFormData } from "../types/account.types";
import { useAuthStore } from "@/features/auth";
import { toast } from "sonner";
import { useCreateAccountMutation, useUpdateUserMutation } from "../hook/useCreateAccount";

const initialForm: AccountFormData = {
    username: "",
    email: "",
    phone: "",
    address: "",
    citizenId: "",
    dateOfBirth: "",
    avatar: "",
    gender: "",
    // accountType: "CHECKING",
};
export const CreateAccount: React.FC = () => {
    const [form, setForm] = useState<AccountFormData>(initialForm);
    const [accountType, setAccountType] = useState("CHECKING");
    const user = useAuthStore(s => s.user);


    useEffect(() => {
        setForm({
            username: user?.username ?? "",
            email: user?.email ?? "",
            phone: user?.phone ?? "",
            address: user?.address ?? "",
            citizenId: user?.citizenId ?? "",
            dateOfBirth: user?.dateOfBirth ?? "",
            avatar: "",
            gender: user?.gender ?? "",
        });

    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { mutate: createAccount } = useCreateAccountMutation(accountType)
    const { mutate: updateUser } = useUpdateUserMutation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("FORM BEFORE UPDATE:", form);

        updateUser(form);

        if (
            form.citizenId &&
            form.address &&
            form.phone &&
            form.dateOfBirth &&
            form.gender
        ) {
            createAccount();
            toast.success("Account created successfully");
        } else {
            toast.warning("Please fill in all required fields");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create Account
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Tạo tài khoản ngân hàng mới
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Customer information */}
                        <section>
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Customer Information
                            </h2>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {/* Username */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter username"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter email"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                {/* Citizen ID */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Citizen ID
                                    </label>

                                    <input
                                        type="text"
                                        name="citizenId"
                                        value={form.citizenId}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter citizen ID"
                                    />
                                </div>

                                {/* Date of birth */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={form.dateOfBirth}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>

                                    <select
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                                    >
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter address"
                                    />
                                </div>

                                {/* Avatar */}
                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Avatar URL
                                    </label>

                                    <input
                                        type="text"
                                        name="avatar"
                                        value={form.avatar}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Account information */}
                        <section className="border-t border-gray-200 pt-6">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Account Information
                            </h2>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Account Type
                                </label>

                                <select
                                    name="accountType"
                                    value={accountType}

                                    onChange={(e) => setAccountType(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="CHECKING">Checking Account</option>
                                    <option value="SAVINGS">Savings Account</option>
                                </select>
                            </div>
                        </section>

                        {/* Submit */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
                            <button
                                type="button"
                                onClick={() => setForm(initialForm)}
                                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
