import sys

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """      // Deleted
      oldMap.forEach((_, id) => {
        if (!newMap.has(id)) deleteDoc(doc(db, collectionName, id));
      });"""

replacement = """      // Deleted
      oldMap.forEach((_, id) => {
        if (!newMap.has(id)) {
          console.log(`Deleting ${id} from ${collectionName}`);
          deleteDoc(doc(db, collectionName, id as string)).catch(err => console.error("Delete failed", err));
        }
      });"""

if target in content:
    content = content.replace(target, replacement)
    with open('src/App.tsx', 'w') as f:
        f.write(content)
    print("Patched makeFirebaseSetter successfully")
else:
    print("makeFirebaseSetter target not found")
