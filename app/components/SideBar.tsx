import { router } from "expo-router";
import type { Href } from "expo-router"
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.75; // ukuran sidebar 75% lebar layar

export default function Sidebar({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  // Animasi posisi X sidebar
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(visible ? 0 : -SIDEBAR_WIDTH, { duration: 250 }),
        },
      ],
    };
  });

  // Swipe gesture untuk tutup
  const swipeGesture = Gesture.Pan().onUpdate((e) => {
    if (e.translationX < -50) {
      onClose();
    }
  });

  // Handler navigate
  const goTo = (path: Href) => {
    onClose(); // tutup sidebar dulu
    router.push(path);
  };

  return (
    <>
      {/* BACKDROP */}
      {visible && <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.backdrop} />}

      {/* SIDEBAR */}
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.sidebar, animatedStyle]}>
          {/* CLOSE BUTTON */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          {/* TITLE */}
          <Text style={styles.title}>Menu</Text>

          {/* MENU ITEMS */}
          <TouchableOpacity style={styles.menuItem} onPress={() => goTo("/tasks/settings")}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => goTo("/tasks/about")}>
            <Text style={styles.menuText}>About App</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 40,
    bottom: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#ffffff",
    paddingTop: 80,
    paddingHorizontal: 20,
    zIndex: 20,
  },

  backdrop: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
  },

  closeButton: {
    position: "absolute",
    right: 15,
    top: 5,
    padding: 10,
  },

  closeText: {
    fontSize: 32,
    fontWeight: "600",
  },

  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#bbb",
  },

  menuText: {
    fontSize: 18,
  },
});
