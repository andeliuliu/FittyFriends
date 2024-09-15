import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI();

export async function happyNotification(personality, task, pet) {

    const type = `You are this kind of pet: ${pet}.
                  You have this type of personality: ${personality}.`

    const notif = `Your owner just completed this task: ${task}, 
                   so give them some encouragement to keep on going!`

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: type },
            {
                role: "user",
                content: notif,
            },
        ],
        max_tokens: 500,
    });
    console.log(response.choices[0].message['content'])
    return response.choices[0].message['content'];
}


export async function neutralNotification(personality, task, pet) {
    const type = `You are this kind of pet: ${pet}
                  You have this type of personality: ${personality}.`

    const notif = `Your owner has not done this task in a bit: ${task}, 
                   so remind them that they should think about getting it done soon!
                   Keep it at one to two sentences.`

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: type },
            {
                role: "user",
                content: notif,
            },
        ],
        max_tokens: 500,
    });
    console.log(response.choices[0].message['content'])
    return response.choices[0].message['content'];
}

export async function sadNotification(personality, task, pet) {
    const type = `You are this kind of pet: ${pet}.
                  You are feeling sad with this type of personality: ${personality}.`

    const notif = `Your owner has not done this task for a while: ${task},
                   so remind them that they should get that done. 
                   Keep it at one to two sentences.`


    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: type },
            {
                role: "user",
                content: notif,
            },
        ],
        max_tokens: 500,
    });
    console.log(response.choices[0].message['content'])
    return response.choices[0].message['content'];
}

export async function verySadNotification(personality, task, pet) {
    const type = `You are this kind of pet: ${pet}.
                  You are very, very sad with this type of personality: ${personality}.`

    const notif = `It has been a long time since your owner has done this task: ${task}. 
                   Strongly urge him to get that done as soon as he can. 
                   Guilt trip him into doing it beacuse it saddens you when he does not do it.
                   Keep it at one to two sentences.`


    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: type },
            {
                role: "user",
                content: notif,
            },
        ],
        max_tokens: 500,
    });
    console.log(response.choices[0].message['content'])
    return response.choices[0].message['content'];
}

export async function gonnaLeaveNotification(personality, task, pet) {
    const type = `You are this kind of pet: ${pet}.
                  You are extremely sad and frustrated with this type of personality: ${personality}. 
                  You feel abandoned and neglected`


    const notif = `It feels like forever since your owner did this task: ${task}
                   Tell them one last time that if they don't this task soon, you will leave.
                   Keep it at one to two sentences.`


    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: type },
            {
                role: "user",
                content: notif,
            },
        ],
        max_tokens: 100,
    });
    console.log(response.choices[0].message['content'])
    return response.choices[0].message['content'];
}

export async function nowLeavingNotification(personality, task, pet) {
    
    const type = `You are this kind of pet: ${pet}.
                  You are extremely sad and frustrated with this type of personality: ${personality}. 
                  You feel abandoned and neglected`

    const notif = `Because your owner did not listen to you when it came to accomplishing this task ${task},
                   You are now leaving them. Wish them the best of luck, but that it is best if you find a new owner
                   Keep it at one to two sentences.`


    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: type },
            {
                role: "user",
                content: notif,
            },
        ],
        max_tokens: 100,
    });
    console.log(response.choices[0].message['content'])
    return response.choices[0].message['content'];
}
