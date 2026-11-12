<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useContentStore } from '@/stores/content.js';

    const { contact } = storeToRefs(useContentStore())

    const mail = ref('')
    const subject = ref('')
    const message = ref('')
    const status = ref('Prêt')
    const sending = ref(false)

    function clearForm() {
        mail.value = ''
        subject.value = ''
        message.value = ''
    }

    function newMessage() {
        clearForm()
        status.value = 'Prêt'
    }

    async function send() {
        if (sending.value) {
            return
        }
        sending.value = true
        status.value = 'Envoi du message...'
        try {
            const reponse = await fetch(contact.value.formspree, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email: mail.value,
                    subject: subject.value,
                    message: message.value,
                }),
            })
            if (!reponse.ok) {
                status.value = `Échec de l'envoi (erreur ${reponse.status}), réessayez.`
                return
            }
            status.value = 'Message envoyé, merci !'
            clearForm()
        } catch (erreur) {
            status.value = 'Échec de l\'envoi : vérifiez votre connexion.'
        } finally {
            sending.value = false
        }
    }

</script>



<template>
    <div class="Contact">
        <div class="toolbar">
            <button class="toolButton" type="submit" form="mailing" :disabled="sending">
                <img src="/icons/OE Send.png" alt="" class="img" >
                <span>Envoyer le message</span>
            </button>
            <button class="toolButton" type="button" :disabled="sending" @click="newMessage()">
                <img src="/icons/OE Create Mail.png" alt="" class="img">
                <span>Nouveau message</span>
            </button>
            <span class="separator"></span>
            <a v-if="contact.linkedin" class="toolButton" :href="contact.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
                <img src="/icons/linkedin.webp" alt="" class="img">
            </a>
        </div>

        <form action="" id="mailing" @submit.prevent="send()">
            <div class="field-row">
                <span class="label">À :</span>
                <span class="input address">Benjamin &lt;benjamin.guillaume78@gmail.com&gt;</span>
            </div>
            <div class="field-row">
                <label class="label" for="from">De :</label>
                <input class="input" id="from" type="email" placeholder="Votre adresse email" v-model="mail" required>
            </div>
            <div class="field-row">
                <label class="label" for="subject">Objet :</label>
                <input class="input" id="subject" type="text" placeholder="Objet de votre message" v-model="subject" required>
            </div>
            <textarea class="input message" aria-label="Message" placeholder="Écrivez votre message ici" v-model="message" required></textarea>
        </form>

        <div class="status-bar">
            <p class="status-bar-field">{{ status }}</p>
        </div>
    </div>
</template>


<style scoped>

.Contact{
    width: 100%;
    min-width: min(560px, 90vw);
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
}

.toolbar{
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    gap: 0.4em;
    padding: 0.5em 0.7em;
    border-bottom: 1px solid #c5c2b2;
    box-shadow: 0 1px #fff;
}

.toolButton{
    display: flex;
    align-items: center;
    gap: 0.5em;
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: 0;
    padding: 0.2em 0.5em;
    color: #555;
}
.toolButton:disabled img{
    filter: grayscale(1);
    opacity: 0.5;
}
.img{
    width: 28px;
    height: 28px;
}
.separator{
    width: 1px;
    align-self: stretch;
    margin: 0 0.5em;
    background-color: #c5c2b2;
    box-shadow: 1px 0 #fff;
}

form{
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0.7em;
}

.label{
    width: 4em;
    flex-shrink: 0;
    text-align: right;
}

.input{
    flex: 1;
    min-width: 0;
    height: 2.4em;
    padding: 0.3em 0.5em;
    border: 2px solid;
    border-color: #a7a6aa #f0efe9 #f0efe9 #a7a6aa;
    background-color: #fff;
}
.input::placeholder{
    font-style: italic;
    color: #999;
}

.address{
    display: flex;
    align-items: center;
    height: auto;
    min-height: 2.4em;
    overflow-wrap: anywhere;
    background-color: #ece9d8;
}
.message{
    flex: 1 1 12em;
    min-height: 8em;
    margin-top: 0.7em;
    resize: none;
}

.status-bar{
    margin: 0;
}
</style>
