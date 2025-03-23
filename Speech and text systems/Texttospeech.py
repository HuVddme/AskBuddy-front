from elevenlabs import ElevenLabs
from elevenlabs import play, save, stream, Voice, VoiceSettings
import os

api_key = os.getenv("ELEVENLABS_API_KEY")
client = ElevenLabs(api_key)




def TTS(Output, speed=1.0):  # Default speed is 1.0 (normal speed)
    audio = client.generate(
        text=Output,
        voice="NFG5qt843uXKj4pFvR7C",
        voice_settings={"speed": speed}  # Adjust speed (e.g., 0.5 for slow, 1.5 for fast)
    )
    play(audio)

TTS("Welcome to my Strip", speed=1) #this should be called with a new imput

