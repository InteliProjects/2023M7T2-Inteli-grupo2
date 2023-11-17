import { FormEvent, useState } from 'react';
import { HOST, BACKPORT } from '@/public-variables';
import Cookies from 'js-cookie';

const CreateUser = () => {
    const meu_token = Cookies.get('token');

    const generatePassword = `http://${HOST}:${BACKPORT}/user/generatePassword`;
    const register = `http://${HOST}:${BACKPORT}/user/register`;
    const sendEmail = `http://${HOST}:${BACKPORT}/user/sendEmail`;
    const configureUser = `http://${HOST}:${BACKPORT}/user/configureUser`;

    const [email, setEmail] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const password = await fetch(generatePassword, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${meu_token}`
            }
        })
        .then((response) => {
            if (response.ok) return response.json();
        })
        .then((data) => {
            if (data) return data.password;
        });

        console.log(`
        Name: ${email}\n
        Password: ${password}
        `);

        await fetch(register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${meu_token}`
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(async(response) => {
            if (response.ok) {
                window.alert(`
                            ${email} cadastrado com sucesso!\n
                            Senha Temporária: ${password}
                `);

                const subject = "Bem vindo ao sistema de gerenciamento de aeronaves!";

                const body = `
                            Olá,\n\n
                            Seu usuário foi cadastrado com sucesso!\n
                            Sua senha temporária é: ${password}\n
                            Por favor, configure seu usuário em: ${configureUser}\n\n
                            Atenciosamente,\n
                            Equipe de desenvolvimento.
                `;

                await fetch(sendEmail, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${meu_token}`
                    },
                    body: JSON.stringify({ email: email, password: password, subject: subject, body: body })
                })
                .then((responsemail) => {
                    if (responsemail.ok) {
                        console.log("Email enviado com sucesso!")
                        return responsemail.json();
                    }
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-flow-col grid-cols-2 bg-gray-100 text-xl p-8 rounded-xl">
            <div>
                <label htmlFor="email" className='font-semibold text-gray-600 mb-4'>Email</label>
                <input
                type="text"
                name='email'
                className="w-full mb-4 p-3 border border-inputGray rounded-md font-montserrat h-10 focus:outline-none "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className=" flex justify-center">
                <button type="submit" className="w-72 text-base bg-[#203D4A] rounded mt-4 text-white font-bold hover:scale-95 duration-300 ease-in-out transition h-14">Criar Usuário</button>
            </div>
            </div>
        </form>
    )
}

export default CreateUser;
