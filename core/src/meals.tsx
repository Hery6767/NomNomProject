// src/meals.tsx
import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    TextInput,
    FlatList,
    Image,
    Pressable,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ===== Reuse màu & style y hệt Home.tsx =====
const { width } = Dimensions.get('window');
const CONTENT_W = Math.min(width * 0.92, 420);
const BRAND = '#0d4d3b';
const BRAND2 = '#0b4a37';
const BRAND_LIGHT = '#eaf6e8';
const BORDER = 'rgba(0,0,0,0.12)';
const BG = '#fff';

// ===== Dữ liệu & ngày dùng lại vibe Home.tsx =====
type MealType = 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner';
type ViewMode = 'Today' | 'Week' | 'Month';
type DayItem = { key: string; day: string; date: string };

const DAYS: DayItem[] = [
    { key: 'sat', day: 'SAT', date: '10' },
    { key: 'sun', day: 'SUN', date: '11' },
    { key: 'mon', day: 'MON', date: '12' },
    { key: 'tue', day: 'TUE', date: '13' },
    { key: 'wed', day: 'WED', date: '14' },
    { key: 'thu', day: 'THU', date: '15' },
    { key: 'fri', day: 'FRI', date: '16' },
];

interface MealItem {
    id: string;
    title: string;
    image: string;
    tags: string[];
    time: string;
    cal: string;
    serving: string;
}

// 👉 Lấy đúng hình & dữ liệu mẫu từ Home.tsx
const MEALS: MealItem[] = [
    {
        id: '1',
        title: 'Fluffy Banana Pancakes',
        image:
            'https://images.unsplash.com/photo-1695046176390-f8c97adb7b17?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=737',
        tags: ['Breakfast', 'Vegetarian'],
        time: '15 mins',
        cal: '250 Cal',
        serving: '2 serving',
    },
    {
        id: '2',
        title: 'Greek Yogurt with Granola',
        image:
            'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop',
        tags: ['Breakfast', 'Healthy'],
        time: '5 mins',
        cal: '200 Cal',
        serving: '1 serving',
    },
];

export default function Meals() {
    const [viewMode, setViewMode] = useState<'Today' | 'Week' | 'Month'>('Today');
    const [activeDay, setActiveDay] = useState('mon');

    // lưu món theo ngày -> bữa
    const [selectedMealsByDay, setSelectedMealsByDay] = useState<
        Record<string, Record<MealType, MealItem | null>>
    >({});

    const [modalVisible, setModalVisible] = useState(false);
    const [activeMealType, setActiveMealType] = useState<MealType | null>(null);
    const [query, setQuery] = useState('');

    const filteredMeals = useMemo(() => {
        if (!query.trim()) return MEALS;
        return MEALS.filter(m =>
            m.title.toLowerCase().includes(query.toLowerCase()),
        );
    }, [query]);

    const dayMeals =
        selectedMealsByDay[activeDay] ??
        ({ Breakfast: null, Lunch: null, Snacks: null, Dinner: null } as Record<
            MealType,
            MealItem | null
        >);

    // ===== Handlers =====
    const openChooser = (type: MealType) => {
        setActiveMealType(type);
        setModalVisible(true);
    };

    const selectMeal = (item: MealItem) => {
        if (!activeMealType) return;
        setSelectedMealsByDay(prev => ({
            ...prev,
            [activeDay]: { ...(prev[activeDay] ?? dayMeals), [activeMealType]: item },
        }));
        setModalVisible(false);
    };

    const clearMeal = (type: MealType) => {
        setSelectedMealsByDay(prev => ({
            ...prev,
            [activeDay]: { ...(prev[activeDay] ?? dayMeals), [type]: null },
        }));
    };

    // ===== UI =====
    return (
        <View style={{ flex: 1, backgroundColor: BG }}>
            <StatusBar barStyle="light-content" />

            {/* Header xanh + segmented */}
            <View
                style={{
                    height: 190,
                    backgroundColor: '#fff',
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ width: CONTENT_W, alignSelf: 'center', paddingTop: 8 }}>
                        <Text style={styles.smallHello}>Meal Planner</Text>
                        <Text style={styles.bigTitle}>
                            Plan your <Text style={{ color: '#b7f57d' }}>Meals</Text>
                        </Text>

                        {/* Segmented */}
                        <View style={styles.segmentWrap}>
                            {(['Today', 'Week', 'Month'] as ViewMode[]).map(mode => (
                                <Pressable
                                    key={mode}
                                    onPress={() => setViewMode(mode)}
                                    style={[
                                        styles.segmentItem,
                                        viewMode === mode && styles.segmentItemActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.segmentText,
                                            viewMode === mode && styles.segmentTextActive,
                                        ]}
                                    >
                                        {mode}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* Days picker */}
                        <FlatList
                            data={DAYS}
                            keyExtractor={d => d.key}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginTop: 10 }}
                            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                            renderItem={({ item }) => {
                                const active = activeDay === item.key;
                                return (
                                    <Pressable
                                        onPress={() => setActiveDay(item.key)}
                                        style={[
                                            styles.dayPill,
                                            { backgroundColor: active ? BRAND : BRAND_LIGHT },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.dayText,
                                                { color: active ? '#fff' : BRAND2, opacity: active ? 1 : 0.9 },
                                            ]}
                                        >
                                            {item.day}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.dayDate,
                                                { color: active ? '#fff' : BRAND2, opacity: active ? 1 : 0.9 },
                                            ]}
                                        >
                                            {item.date}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                </SafeAreaView>
            </View >

            {/* Nội dung các bữa */}
            < FlatList
                data={['Breakfast', 'Lunch', 'Snacks', 'Dinner'] as MealType[]}
                keyExtractor={i => i}
                contentContainerStyle={{ width: CONTENT_W, alignSelf: 'center', paddingVertical: 16, gap: 16 }
                }
                renderItem={({ item }) => {
                    const meal = dayMeals[item];
                    return (
                        <View style={{ gap: 8 }}>
                            <View style={styles.sectionHeaderRow}>
                                <Text style={styles.sectionTitle}>{item}</Text>
                                {meal && (
                                    <Pressable onPress={() => clearMeal(item)} hitSlop={8}>
                                        <Image
                                            source={require('../assets/icon/trash.png')}
                                            style={{ width: 15, height: 15, tintColor: BRAND }}
                                        />
                                    </Pressable>
                                )}
                            </View>

                            {meal ? (
                                <View style={styles.mealCard}>
                                    <Image source={{ uri: meal.image }} style={styles.mealImg} />
                                    <View style={{ flex: 1, paddingVertical: 10 }}>
                                        <Text numberOfLines={1} style={styles.mealTitle}>
                                            {meal.title}
                                        </Text>
                                        <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
                                            {meal.tags.map(t => (
                                                <View key={t} style={styles.tag}>
                                                    <Text style={styles.tagText}>{t}</Text>
                                                </View>
                                            ))}
                                        </View>
                                        <View style={styles.metaRow}>
                                            <View style={styles.metaItem}>
                                                <Image
                                                    source={require('../assets/icon/clock.png')}
                                                    style={{ width: 14, height: 14, tintColor: BRAND }}
                                                />
                                                <Text style={styles.metaText}>{meal.time}</Text>
                                            </View>
                                            <View style={styles.metaItem}>
                                                <Image
                                                    source={require('../assets/icon/fire.png')}
                                                    style={{ width: 16, height: 16, tintColor: BRAND }}
                                                />
                                                <Text style={styles.metaText}>{meal.cal}</Text>
                                            </View>
                                            <View style={styles.metaItem}>
                                                <Image
                                                    source={require('../assets/icon/serving.png')}
                                                    style={{ width: 14, height: 14, tintColor: BRAND }}
                                                />
                                                <Text style={styles.metaText}>{meal.serving}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <Pressable style={styles.chooseBtn} onPress={() => openChooser(item)}>
                                    <Text style={styles.chooseText}>+ Choose Meal</Text>
                                </Pressable>
                            )}
                        </View>
                    );
                }}
            />

            {/* Popup chọn món – dùng lại hình & icons của Home */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Image
                                source={require('../assets/icon/hatcook.png')}
                                style={{ width: 14, height: 14, tintColor: BRAND }}
                            />
                            <Text style={styles.modalTitle}>Choose a meal</Text>
                        </View>

                        <View style={styles.searchBox}>
                            <Image
                                source={require('../assets/icon/search.png')}
                                style={{ width: 15, height: 15, tintColor: 'rgba(0,0,0,0.4)' }}
                            />
                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Search in meals..."
                                placeholderTextColor="rgba(0,0,0,0.40)"
                                style={styles.searchInput}
                            />
                        </View>

                        <FlatList
                            data={filteredMeals}
                            keyExtractor={m => m.id}
                            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => selectMeal(item)}
                                    style={({ pressed }) => [
                                        styles.modalItem,
                                        { transform: [{ scale: pressed ? 0.99 : 1 }] },
                                    ]}
                                >
                                    <Image source={{ uri: item.image }} style={styles.modalImg} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.mealTitle}>{item.title}</Text>
                                        <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
                                            {item.tags.map(t => (
                                                <View key={t} style={styles.tag}>
                                                    <Text style={styles.tagText}>{t}</Text>
                                                </View>
                                            ))}
                                        </View>
                                        <View style={[styles.metaRow, { marginTop: 8 }]}>
                                            <View style={styles.metaItem}>
                                                <Image
                                                    source={require('../assets/icon/clock.png')}
                                                    style={{ width: 14, height: 14, tintColor: BRAND }}
                                                />
                                                <Text style={styles.metaText}>{item.time}</Text>
                                            </View>
                                            <View style={styles.metaItem}>
                                                <Image
                                                    source={require('../assets/icon/fire.png')}
                                                    style={{ width: 16, height: 16, tintColor: BRAND }}
                                                />
                                                <Text style={styles.metaText}>{item.cal}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            )}
                        />

                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

// ===== Styles giữ đúng chất Home.tsx =====
const styles = StyleSheet.create({
    smallHello: { color: BRAND, fontSize: 12, opacity: 0.95, fontWeight: '800' },
    bigTitle: { color: BRAND, fontSize: 24, fontWeight: '800', marginTop: 4 },

    segmentWrap: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: '#ecf5f0',
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: '#d2e8dc',
    },
    segmentItem: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
    segmentItemActive: { backgroundColor: '#fff' },
    segmentText: { fontWeight: '700', color: '#3f5f53' },
    segmentTextActive: { color: BRAND },

    dayPill: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        width: 64,
    },
    dayText: { fontSize: 12, fontWeight: '700' },
    dayDate: { marginTop: 2, fontSize: 14, fontWeight: '800' },

    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    sectionTitle: { color: '#0b1a18', fontWeight: '800', fontSize: 18 },

    chooseBtn: {
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: BRAND_LIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chooseText: { color: BRAND2, fontWeight: '800', fontSize: 15 },

    mealCard: {
        flexDirection: 'row',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    mealImg: { width: 76, height: 76, borderRadius: 12, margin: 10 },
    mealTitle: { color: '#0b1a18', fontWeight: '800', fontSize: 16 },

    tag: {
        backgroundColor: BRAND_LIGHT,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    tagText: { color: BRAND2, fontSize: 11, fontWeight: '700' },

    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { color: BRAND2, fontSize: 11, fontWeight: '700' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },
    modalBox: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
        maxHeight: '75%',
        gap: 12,
    },
    modalTitle: { fontSize: 16, fontWeight: '800', color: BRAND2 },

    searchBox: {
        height: 44,
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: BORDER,
    },
    searchInput: { flex: 1, color: '#0b1a18', fontSize: 14, paddingVertical: 10 },

    modalItem: {
        flexDirection: 'row',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: BORDER,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingRight: 10,
    },
    modalImg: { width: 76, height: 76, borderRadius: 12, margin: 10 },

    closeButton: {
        marginTop: 6,
        backgroundColor: BRAND,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
