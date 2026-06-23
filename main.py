from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from agents.script_agent import generate_script
from agents.storyboard_agent import generate_storyboard
from agents.continuity_agent import check_continuity
from agents.video_agent import generate_video, check_video_status
from agents.editor_agent import create_final_edit

app = FastAPI()

class GenerateRequest(BaseModel):
    topic: str

@app.post("/generate")
def generate(request: GenerateRequest):
    topic = request.topic
    print(f"\n--- Starting generation pipeline for topic: '{topic}' ---")
    
    # Step 1: Script Generation
    print("\nStep 1: Generating script...")
    try:
        script = generate_script(topic)
        print("Script generation successful.")
    except Exception as e:
        print(f"Error in Script Generation: {e}")
        raise HTTPException(status_code=500, detail=f"Script generation failed: {e}")

    # Step 2: Storyboard Generation
    print("\nStep 2: Generating storyboard...")
    try:
        scenes = generate_storyboard(script)
        if not scenes:
            raise ValueError("Storyboard generation returned empty.")
        print(f"Storyboard generation successful. Got {len(scenes)} scenes.")
    except Exception as e:
        print(f"Error in Storyboard Generation: {e}")
        raise HTTPException(status_code=500, detail=f"Storyboard generation failed: {e}")

    # Step 3: Continuity Check
    print("\nStep 3: Checking continuity...")
    try:
        continuity_result = check_continuity(scenes)
        if continuity_result.get("has_errors"):
            print("Continuity errors found! Applying fixes...")
            scenes = continuity_result.get("fixed_scenes", scenes)
        else:
            print("No continuity errors found.")
    except Exception as e:
        print(f"Continuity check failed (continuing with original scenes): {e}")

    # Step 4: Submit Video Generation Tasks
    print("\nStep 4: Submitting video generation tasks...")
    task_ids = []
    for i, scene in enumerate(scenes):
        print(f"Submitting scene {i+1}...")
        task_id = generate_video(scene)
        if task_id:
            task_ids.append(task_id)
        else:
            print(f"Warning: Failed to submit scene {i+1}")
            task_ids.append(None)
            
    # Step 5: Poll Video Tasks
    print("\nStep 5: Polling video generation tasks...")
    video_urls = []
    for i, task_id in enumerate(task_ids):
        if not task_id:
            video_urls.append(None)
            continue
            
        print(f"Waiting for scene {i+1} (task: {task_id}) to complete...")
        video_url = check_video_status(task_id)
        if video_url:
            print(f"Scene {i+1} completed! URL: {video_url}")
            video_urls.append(video_url)
        else:
            print(f"Scene {i+1} failed to generate video.")
            video_urls.append(None)

    # Step 6: Create Final Edit
    print("\nStep 6: Creating final edit...")
    try:
        final_video_path = create_final_edit(video_urls, scenes)
        if not final_video_path:
            raise ValueError("Editor returned empty path.")
        print(f"Final edit created at {final_video_path}")
    except Exception as e:
        print(f"Error in Final Edit: {e}")
        raise HTTPException(status_code=500, detail=f"Final edit failed: {e}")

    print("\n--- Pipeline Generation Complete ---")
    return {
        "status": "success",
        "video_path": final_video_path,
        "script": script,
        "scenes": scenes
    }
