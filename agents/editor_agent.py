import os
import requests
from typing import List, Dict, Any

try:
    from moviepy.editor import VideoFileClip, concatenate_videoclips
except ImportError:
    print("moviepy is not installed. Please run: pip install moviepy requests")

def create_final_edit(video_urls: List[str], scenes: List[Dict[str, Any]]) -> str:
    """
    Downloads each video from the URLs, uses moviepy to concatenate them 
    in order with a simple fade transition, and exports as 'final_drama.mp4'.
    """
    temp_files = []
    
    print("Downloading videos...")
    for i, url in enumerate(video_urls):
        if not url:
            print(f"Skipping empty URL for scene {i+1}")
            continue
            
        try:
            print(f"Downloading scene {i+1} from {url[:50]}...")
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            filename = f"temp_scene_{i+1}.mp4"
            with open(filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            temp_files.append(filename)
        except Exception as e:
            print(f"Failed to download video {i+1}: {e}")
            
    if not temp_files:
        print("No videos downloaded successfully.")
        return ""
        
    print("Editing videos together...")
    clips = []
    try:
        for f in temp_files:
            clip = VideoFileClip(f)
            # Add a gentle 0.5-second fade in and fade out transition for each clip
            # Using direct imports to satisfy static type checkers like Pyright
            from moviepy.video.fx.fadein import fadein
            from moviepy.video.fx.fadeout import fadeout
            clip = clip.fx(fadein, 0.5).fx(fadeout, 0.5)
            clips.append(clip)
            
        # Concatenate them into a single video
        # method="compose" handles different sizes/framerates better and allows effects
        final_clip = concatenate_videoclips(clips, method="compose")
        
        output_path = "final_drama.mp4"
        print(f"Exporting final video to {output_path}...")
        # High quality export
        final_clip.write_videofile(output_path, codec="libx264", audio_codec="aac", fps=24)
        
        return output_path
    except Exception as e:
        print(f"Error during video editing: {e}")
        return ""
    finally:
        # Cleanup clips from memory to release file handles
        for clip in clips:
            clip.close()
        # Delete temporary downloaded video segments
        for f in temp_files:
            if os.path.exists(f):
                os.remove(f)

if __name__ == "__main__":
    # Test block
    print("Editor Agent initialized.")
    # In a real run, this would be passed the generated DashScope video URLs
