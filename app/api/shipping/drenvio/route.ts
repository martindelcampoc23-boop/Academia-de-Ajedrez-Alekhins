import { NextResponse } from 'next/server';
import { getDrEnvioRates } from '@/lib/drenvio';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postalCode, subtotal } = body;

    const zip = typeof postalCode === 'string' ? postalCode.trim() : '';
    const subtotalAmount = typeof subtotal === 'number' ? subtotal : 0;

    const rates = await getDrEnvioRates({
      destinationZip: zip,
      subtotal: subtotalAmount,
    });

    return NextResponse.json({
      success: true,
      provider: 'DrEnvío Logistics Hub',
      destinationZip: zip,
      rates,
    });
  } catch (error: any) {
    console.error('[DrEnvío Route Error]:', error);
    return NextResponse.json(
      { error: 'Error al cotizar tarifas de DrEnvío', details: error.message },
      { status: 500 }
    );
  }
}

