import os
import json
from typing import List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def generate_storyboard(script: str) -> List[Dict[str, Any]]:
    """
    Converts a script into a storyboard JSON array using Qwen API.
    """
    api_key = os.getenv("QWEN_API_KEY")
    base_url = os.getenv("QWEN_BASE_URL")
    
    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
    )
    
    system_prompt = "You are a visual director. Convert scripts into detailed storyboards for AI video generation."
    user_message = f"Convert this script into a storyboard. Return ONLY a JSON array with no extra text. Each scene should have: scene_number, location, mood, visual_description (detailed prompt for video generation, describe lighting, camera angle, colors), characters, dialogue_summary\n\nScript:\n{script}"
    
    try:
        response = client.chat.completions.create(
            model="qwen-plus",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        
        content = response.choices[0].message.content.strip()
        
        # Remove markdown JSON block formatting if present
        if content.startswith("```json"):
            content = content[7:]
        elif content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
            
        content = content.strip()
        
        return json.loads(content)
        
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}")
        print(f"Raw content was: {content}")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

if __name__ == "__main__":
    sample = "SCENE 1 - Rain outside cafe. Leo and Jamie meet after 10 years."
    result = generate_storyboard(sample)
    print(json.dumps(result, indent=2))
