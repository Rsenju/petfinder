import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, Building2, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const registerOngSchema = z
  .object({
    name: z.string().min(3, "Informe seu nome"),
    ongName: z.string().min(3, "Informe o nome da ONG"),
    email: z.string().email("Informe um email valido"),
    password: z.string().min(8, "Use pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
    whatsapp: z.string().min(10, "Informe um WhatsApp valido"),
    city: z.string().min(2, "Informe a cidade"),
    neighborhood: z.string().optional(),
    description: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas nao conferem",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerOngSchema),
    defaultValues: {
      name: "",
      ongName: "",
      email: "",
      password: "",
      confirmPassword: "",
      whatsapp: "",
      city: "",
      neighborhood: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setFormError("");
    setSuccessMessage("");
    try {
      const result = await registerAccount(values);
      if (!result.success) throw new Error(result.error);
      setSuccessMessage(
        "Cadastro enviado. Se a confirmacao por email estiver ativa no Supabase, confirme o email antes de entrar.",
      );
      window.setTimeout(() => navigate("/dashboard"), 900);
    } catch (error) {
      setFormError(error.message || "Nao foi possivel criar o cadastro.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </button>

      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="bg-slate-800 p-6 sm:p-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-200">
            <Building2 className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Cadastrar ONG</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Crie a conta da organizacao para gerenciar pets, dados de contato e pedidos de adocao.
          </p>
          <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
            Em producao, a liberacao do painel depende do perfil aprovado no Supabase.
          </p>
        </aside>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 sm:p-8" noValidate>
          {formError && (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-100">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              {formError}
            </div>
          )}
          {successMessage && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-4 text-sm text-emerald-100">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              {successMessage}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Seu nome" error={errors.name?.message}>
              <input {...register("name")} className="field" />
            </Field>
            <Field label="Nome da ONG" error={errors.ongName?.message}>
              <input {...register("ongName")} className="field" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" className="field" />
            </Field>
            <Field label="WhatsApp" error={errors.whatsapp?.message}>
              <input {...register("whatsapp")} className="field" placeholder="(71) 99999-0000" />
            </Field>
            <Field label="Senha" error={errors.password?.message}>
              <input {...register("password")} type="password" className="field" />
            </Field>
            <Field label="Confirmar senha" error={errors.confirmPassword?.message}>
              <input {...register("confirmPassword")} type="password" className="field" />
            </Field>
            <Field label="Cidade" error={errors.city?.message}>
              <input {...register("city")} className="field" />
            </Field>
            <Field label="Bairro" error={errors.neighborhood?.message}>
              <input {...register("neighborhood")} className="field" />
            </Field>
          </div>

          <Field label="Descricao da ONG" error={errors.description?.message}>
            <textarea {...register("description")} className="field min-h-28" />
          </Field>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
            Criar cadastro
          </button>

          <p className="text-center text-sm text-slate-400">
            Ja tem conta?{" "}
            <Link to="/login" className="font-medium text-blue-300 hover:text-blue-200">
              Entrar
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block text-sm text-slate-200">
      {label}
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </label>
  );
}
