import os
import time
import httpx
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis"

def generate_video(scene: Dict[str, Any], model: str = "wan2.1-t2v-turbo") -> Optional[str]:
    """
    Submits an async video generation task to DashScope.
    """
    api_key = os.getenv("QWEN_API_KEY")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "X-DashScope-Async": "enable",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": model,
        "input": {"prompt": scene.get("visual_description", "")},
        "parameters": {"size": "1280*720", "duration": 5}
    }
    
    try:
        response = httpx.post(API_URL, headers=headers, json=data)
        response.raise_for_status()
        result = response.json()
        return result.get("output", {}).get("task_id")
    except Exception as e:
        print(f"Failed to generate video task: {e}")
        if isinstance(e, httpx.HTTPStatusError):
            print(e.response.text)
        return None

def check_video_status(task_id: str) -> Optional[str]:
    """
    Polls the task status until completion or failure.
    """
    api_key = os.getenv("QWEN_API_KEY")
    url = f"https://dashscope-intl.aliyuncs.com/api/v1/tasks/{task_id}"
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    while True:
        try:
            response = httpx.get(url, headers=headers)
            response.raise_for_status()
            result = response.json()
            
            status = result.get("output", {}).get("task_status", "UNKNOWN")
            print(f"Task {task_id} status: {status}")
            
            if status == "SUCCEEDED":
                # Some DashScope video APIs return 'video_url', others 'video_url_list' or similar
                output = result.get("output", {})
                return output.get("video_url") or output.get("video_download_url") or str(output)
            elif status in ["FAILED", "CANCELED"]:
                print("Task failed or canceled:", result.get("output", {}).get("message"))
                return None
            
            time.sleep(10)
        except Exception as e:
            print(f"Error checking status: {e}")
            if isinstance(e, httpx.HTTPStatusError):
                print(e.response.text)
            return None

if __name__ == "__main__":
    sample_scene = {
        "visual_description": "Medium-wide shot from a low-angle side perspective, capturing soft rain streaks on the lens and gentle steam rising from ceramic mugs. Warm amber light spills from the café’s large glass windows onto wet cobblestones."
    }
    
    models_to_test = [
        "wanx2.1-t2v-turbo",
        "wanx-v2.1-t2v-turbo",
        "wan2.1-t2v-turbo",
        "wanx2-t2v-turbo"
    ]
    
    for model_name in models_to_test:
        print(f"\n--- Testing model: {model_name} ---")
        task_id = generate_video(sample_scene, model=model_name)
        if task_id:
            print(f"Success! Task submitted with ID: {task_id}")
        else:
            print("Failed to submit task for this model.")
