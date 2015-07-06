(ns kata)

(defn digitize
  [n]
  (map #(Integer. (str %)) (str n))
)