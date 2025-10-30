import os, json

base_path = "assets/gallery"

for event in os.listdir(base_path):
    event_path = os.path.join(base_path, event, "fotos")
    if not os.path.isdir(event_path):
        continue

    images = [f for f in os.listdir(event_path) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    images.sort()

    output = {"images": images}
    json_path = os.path.join(base_path, event, "photos.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"✅ Generado: {json_path} ({len(images)} fotos)")
