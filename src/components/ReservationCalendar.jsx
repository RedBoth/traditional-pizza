import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReservationCalendar() {
    const [ fecha, setFecha ] = useState(new Date());
    const [ reservas, setReservas ] = useState([]);
    const [ horaSeleccionada, setHoraSeleccionada ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ disponibilidad, setDisponibilidad ] = useState(null);
    const [ tipoMesa , setTipoMesa ] = useState("");
    const [ personas, setPersonas ] = useState(1);
    const [ errors, setErrors ] = useState({});


    const horarios = ["12:00", "13:00", "14:00", "20:00", "21:00", "22:00"];

    useEffect(() => {
        const fetchReservas = async () => {
            const fechaFormateada = fecha.toISOString().split('T')[0];
            const response = await fetch(`http://localhost:3000/reservas/${fechaFormateada}`);
            const data = await response.json();
            setReservas(data);
        };

        fetchReservas();
    }, [fecha]);

    useEffect(() => {
        if (horaSeleccionada) {
            const consultarDisponibilidad = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/reservas/disponibilidad?fecha=${fecha.toISOString().split('T')[0]}&hora=${horaSeleccionada}`);
                    const data = await response.json();
                    setDisponibilidad(data);
                } catch (error) {
                    console.error('Error al consultar disponibilidad', error)
                }
            };

            consultarDisponibilidad();
        }
    }, [fecha, horaSeleccionada]);

    const horariosOcupados = reservas.map(res => res.hora);

    const validateForm = () => {
        const newErrors = {};

        if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
        if (!email.trim()) newErrors.email = 'El email es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'El email no es válido.';
        if (!horaSeleccionada) newErrors.hora = 'Seleccioná un horario.';
        if (!tipoMesa) newErrors.tipoMesa = 'Seleccioná un tipo de mesa.';
        if (personas < 1 || personas > (tipoMesa === 'mesa-4' ? 4 : tipoMesa === 'mesa-2' ? 2 : 1)) {
            newErrors.personas = 'Cantidad de personas inválida para el tipo de mesa.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if(!validateForm()) return;

        try {
            const response = await fetch("http://localhost:3000/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre,
                    email,
                    fecha: fecha.toISOString().split('T')[0],
                    hora: horaSeleccionada,
                    tipoMesa,
                    personas
                })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Reserva confirmada!");
                // Reset de campos
                setHoraSeleccionada("");
                setTipoMesa("");
                setPersonas(1);
                setNombre("");
                setEmail("");
                setErrors({});
            } else {
                alert(result.message || "Error al reservar.");
            }
        } catch (error) {
            console.error(error);
            setErrors("Error al conectar con el servidor.");
        }
    };

    return (
        <section className="py-16 px-4 max-w-4xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Reservá tu mesa</h2>

            <div className="flex flex-col gap-6 items-center">
                <DatePicker selected={fecha} onChange={(date) => setFecha(date)} inline minDate={new Date()} onMonthChange={() => setFecha(null)}/>

                <div className="flex gap-4 flex-wrap justify-center">
                    {horarios.map((hora) => (
                        <button key={hora} onClick={() => setHoraSeleccionada(hora)} disabled={horariosOcupados.includes(hora)} className={`py-2 px-4 rounded cursor-pointer ${horaSeleccionada === hora ? 'bg-red-500' : 'bg-neutral-700'} ${horariosOcupados.includes(hora) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}>
                            {hora}
                        </button>
                    ))}
                </div>

                {disponibilidad && (
                    <div className="flex gap-4 flex-wrap justify-center mt-4">
                        {Object.keys(disponibilidad).map((tipo) => (
                            <button key={tipo} onClick={() => setTipoMesa(tipo)} disabled={disponibilidad[tipo] <= 0} className={`py-2 px-4 rounded cursor-pointer ${tipoMesa === tipo ? 'bg-red-500' : 'bg-neutral-700'} ${disponibilidad[tipo] <= 0 ? 'opacity-60 cursor-not-allowed' : 'hover:bg-red-600'}`}>
                                {tipo == 'mesa-4' && 'Mesa para 4'}
                                {tipo == 'mesa-2' && 'Mesa para 2'}
                                {tipo == 'barra' && 'Barra'}
                                <span className="ml-2 text-sm text-gray-400">({disponibilidad[tipo]} disponibles)</span>
                            </button>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-1/2 mt-6">
                    <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={`p-3 bg-neutral-800 border ${errors.nombre ? 'border-red-500' : 'border-neutral-700'} rounded text-white`} />
                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    <input type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} className={`p-3 bg-neutral-800 border ${errors.email ? 'border-red-500' : 'border-neutral-700'} rounded text-white`}/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    {tipoMesa && (
                        <div className="flex flex-col gap-2">
                            <label>Cantidad de personas:</label>
                            <input type="number" min="1" max={tipoMesa === 'mesa-4' ? 4 : tipoMesa === 'mesa-2' ? 2 : 1} value={personas} onChange={(e) => setPersonas(Number(e.target.value))} className={`p-3 bg-neutral-800 border ${errors.personas ? 'border-red-500' : 'border-neutral-700'} rounded text-white`}/>
                            {errors.personas && <p className="text-red-500 text-sm">{errors.personas}</p>}
                        </div>
                    )}
                    <button type="submit" disabled={!horaSeleccionada || !nombre.trim() === "" || !email.trim() === "" || !tipoMesa || personas < 1} className="bg-red-500 hover:bg-red-600 py-3 rounded font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        Confirmar reserva
                    </button>
                </form>
                {errors.form && <p className="text-red-500 text-center mt-2">{errors.form}</p>}
            </div>
        </section>
    );
}