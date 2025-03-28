const API_KEY = "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"; // Substitua pela sua chave da API

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>Você:</strong> ${userInput}</p>`;
    document.getElementById("user-input").value = "";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;

        chatBox.innerHTML += `<p><strong>Bot:</strong> ${botMessage}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p style="color:red;"><strong>Erro:</strong> Não foi possível obter resposta.</p>`;
    }
}
