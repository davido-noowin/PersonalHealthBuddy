food_log = [
    (0, 1, True, False, True, False, True)]


food_score = 0
fruit_score = 0
veg_score = 0
protein_score = 0
grain_score = 0
dairy_score = 0
for food in food_log:
    fruit_score += food[2]
    veg_score += food[3]
    protein_score += food[4]
    grain_score += food[5]
    dairy_score += food[6]

food_score_arr = [fruit_score, veg_score, protein_score, grain_score, dairy_score]
food_score = sum(food_score_arr)*4*5/len(food_log)

# select the category with the lowest sum
title = ['fruits', 'vegetables', 'protein', 'grain', 'dairy']
rec = f'For a healthier diet, eat more {title[food_score_arr.index(min(food_score_arr))]}.'

print(food_score, rec)