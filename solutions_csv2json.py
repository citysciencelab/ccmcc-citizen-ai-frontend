#!/usr/bin/env python

import csv
import json

o = {}
with open('./solution_descriptions.csv', newline='') as csvfile:
  reader = csv.reader(csvfile, delimiter=';', quotechar='"')
  for row in reader:
    if len(row) < 5: continue
    [id, idx, title, shortdesc, longdesc] = row
    j = {
      'id': id,
      'title': title,
      'description': longdesc.replace('\n\n', '<br/>\n'),
      'shortDescription': shortdesc,
    }
    #print(j)
    o[id] = j

print("export const data = ", end='')
print(json.dumps(o, indent="  "))
