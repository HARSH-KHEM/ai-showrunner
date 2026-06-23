import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def generate_script(topic: str) -> str:
    """
    Generates a 5-scene short drama script using Qwen API.
    """
    api_key = os.getenv("QWEN_API_KEY")
    base_url = os.getenv("QWEN_BASE_URL")
    
    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
    )
    
    system_prompt = "You are a professional short drama scriptwriter. Create engaging, cinematic scripts."
    user_message = f"Write a 5-scene short drama script about: {topic}. For each scene include: Scene number, Location, Mood, Character actions, Dialogue."
    
    response = client.chat.completions.create(
        model="qwen-plus",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    )
    
    return response.choices[0].message.content

if __name__ == "__main__":
    result = generate_script("two friends reuniting after 10 years")
    print(result)
