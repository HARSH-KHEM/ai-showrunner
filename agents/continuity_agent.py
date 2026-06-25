import os
import json
from typing import List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def check_continuity(scenes: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Checks continuity of a list of scenes using Qwen API.
    """
    api_key = os.getenv("QWEN_API_KEY")
    base_url = os.getenv("QWEN_BASE_URL")
    
    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
    )
    
    system_prompt = "You are a film continuity supervisor. Detect inconsistencies between scenes."
    
    user_message = f"""Please check the following storyboard scenes for continuity errors.
Focus on:
1. Character appearance consistency (clothing, props)
2. Location consistency
3. Mood/lighting flow between scenes
4. Story logic

Return ONLY a valid JSON object in this exact format, with no markdown formatting or extra text:
{{
  "has_errors": true/false,
  "errors": ["list of issues found"],
  "fixed_scenes": [the corrected scene list matching the original structure but with fixes applied]
}}

Scenes to check:
{json.dumps(scenes, indent=2)}
"""
    
    content = ""
    try:
        response = client.chat.completions.create(
            model="qwen-plus",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        )
        
        raw_content = response.choices[0].message.content
        content = raw_content.strip() if raw_content else ""
        
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
        return {"has_errors": False, "errors": [], "fixed_scenes": scenes}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"has_errors": False, "errors": [], "fixed_scenes": scenes}

if __name__ == "__main__":
    sample_scenes = [
        {
            "scene_number": 1,
            "location": "A quiet park, sunny day",
            "mood": "Peaceful",
            "visual_description": "Sunlight filtering through trees.",
            "characters": ["Leo is wearing a red shirt and glasses."],
            "dialogue_summary": "Leo sits down."
        },
        {
            "scene_number": 2,
            "location": "A quiet park, sunny day",
            "mood": "Peaceful",
            "visual_description": "Same park bench, but now it's pouring rain.",
            "characters": ["Leo is wearing a blue jacket and no glasses."],
            "dialogue_summary": "Leo continues his thought."
        }
    ]
    
    print("Checking continuity...")
    result = check_continuity(sample_scenes)
    print(json.dumps(result, indent=2))
