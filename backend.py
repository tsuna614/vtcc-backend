import pickle
from skimage import feature
import cv2 as cv
import numpy as np
import json
import os

data = './data'
img_path = os.listdir(data)
with open(os.path.join(data,img_path[0])) as f:
   img_data = json.load(f)
   
img = img_data['path']

def TinhHOG(pathfilename):
  print("python is running")
  img = cv.imread(pathfilename,0)
  img = cv.resize(img, (64, 128))
  (hog, hog_image) = feature.hog(
      img, orientations=9,
      pixels_per_cell=(8, 8), cells_per_block=(2, 2),
      block_norm='L2-Hys', visualize=True, transform_sqrt=True
      )
  # return hog / np.linalg.norm(hog)
  return hog.reshape(1,-1)

load_model = pickle.load(open('svm_hog.sav', 'rb'))
# load_model = pickle.load(open('E:\\MayHocvaCongCu_SE335\\Project\\VTCC-App\\backend\\svm_hog.sav', 'rb'))
# X_temp=np.array(TinhHOG('E:\computer_vision\Project\BanhPia\Banh_pia_138.png').reshape(1,-1))
# print(load_model.predict(X_temp))


print(load_model.predict(TinhHOG(img)))
# print("python is running")

