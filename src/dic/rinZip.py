import argparse
import io
import zipfile

import requests

parser = argparse.ArgumentParser()
parser.add_argument("url", help="the url where to download")
parser.add_argument("location", help="the url where to download")
args = parser.parse_args()

r = requests.get(args.url, stream=True)
if r.ok:
    print("Luncher has connected to the server")
    try:
        print("Checking zipped files")
        z = zipfile.ZipFile(io.BytesIO(r.content))
    except Exception as e:
        print("[ERROR]" + e)
    try:
        print("Upzipping files")
        z.extractall(str(args.location))
    except Exception as e:
        print("[ERROR]" + e)
else:
    print("[ERROR] something went wrong......")
