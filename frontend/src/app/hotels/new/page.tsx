'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FormValues {
  name: string;
  nit: string;
  address: string;
  city_id: number;
  max_rooms: number;
}

const schema = yup.object({
  name: yup.string().required(),
  nit: yup.string().matches(/^\d{8}-\d$/).required(),
  address: yup.string().required(),
  city_id: yup.number().required(),
  max_rooms: yup.number().min(1).required(),
});

export default function NewHotelPage() {
  const router = useRouter();
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    api.get('/cities').then(r => setCities(r.data));
  }, []);

  const onSubmit = async (data: FormValues) => {
    await api.post('/hotels', data);
    router.push('/hotels');
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Crear Hotel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label>Nombre</label>
          <input {...register('name')} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        {/* Repite para nit, address, city_id, max_rooms */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </main>
  );
}
